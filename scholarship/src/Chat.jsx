import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

// Establish a single stable socket connection outside the component
const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [room, setRoom] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const scrollRef = useRef();

  const studentName = localStorage.getItem("name") || "Student";
  const studentId = localStorage.getItem("userId") || "guest_user";

  /* ===============================
      INITIAL SETUP & GLOBAL LISTENERS
  ================================= */
  useEffect(() => {
    // Fetch all available rooms
    fetch("http://localhost:5000/scholarships")
      .then((res) => res.json())
      .then((data) => setScholarships(data))
      .catch((err) => console.error("Error fetching rooms:", err));

    // Listen for incoming messages broadcast from the server
    socket.on("receive_message", (data) => {
      // Logic: Only update the log if the message belongs to the room the user is currently in
      // Use the functional update to avoid stale closure issues with the 'room' state
      setChatLog((prev) => {
        // Double check the room match to prevent message "bleeding" from other rooms
        if (prev.length > 0 && prev[0].room !== data.room) return prev;
        return [...prev, data];
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  /* ===============================
      AUTO SCROLL
  ================================= */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  /* ===============================
      ROOM JOINING LOGIC
  ================================= */
  const joinRoom = (name) => {
    if (name === room) return;

    // 1. Leave current room to stop receiving broadcasts for it
    if (room) {
      socket.emit("leave_room", room);
    }

    // 2. Set new room state and clear UI
    setRoom(name);
    setChatLog([]);

    // 3. Inform server of the new room subscription
    socket.emit("join_room", name);

    // 4. Fetch History: This is vital so User 2 sees User 1's previous messages
    // Use encodeURIComponent because scholarship names have spaces/special characters
    fetch(`http://localhost:5000/messages/${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => setChatLog(data))
      .catch((err) => console.error("Error fetching history:", err));
  };

  /* ===============================
      SEND MESSAGE LOGIC
  ================================= */
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !room) return;

    const messageData = {
      room,
      author: studentName,
      message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      userId: studentId
    };

    // Emit message to server; Server uses io.to(room).emit to send it to everyone
    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <style>{`
        .chat-container { 
          height: 100vh; 
          width: 100vw; 
          display: flex; 
          background: #0b141a; 
          font-family: 'Segoe UI', sans-serif; 
          overflow: hidden;
        }

        .sidebar { 
          width: 350px; 
          background: #111b21; 
          color: white; 
          display: flex; 
          flex-direction: column; 
          border-right: 1px solid #202c33; 
          flex-shrink: 0; 
        }

        .sidebar h3 { padding: 25px; margin: 0; font-size: 1.3rem; border-bottom: 1px solid #202c33; }
        .room-list { flex: 1; overflow-y: auto; padding: 15px; }
        .room-item { padding: 12px 15px; cursor: pointer; border-radius: 8px; color: #aebac1; font-size: 0.95rem; margin-bottom: 5px; transition: 0.2s; }
        .room-item:hover { background: #202c33; }
        .room-item.active { background: #0080ff; color: white; font-weight: bold; }
        
        .chat-window { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          background-color: #efeae2; 
          min-width: 0; 
        }

        .chat-header { 
          background: #fff; 
          padding: 15px 30px; 
          border-bottom: 1px solid #d1d7db; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }
        
        .messages-display { 
          flex: 1; 
          padding: 25px 80px;
          overflow-y: auto; 
          display: flex; 
          flex-direction: column; 
          gap: 12px;
          background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
          background-repeat: repeat;
        }
        
        .msg-row { display: flex; width: 100%; }
        .msg-sent { justify-content: flex-end; }
        .msg-received { justify-content: flex-start; }
        
        .bubble { 
          max-width: 75%; 
          padding: 10px 18px; 
          border-radius: 8px; 
          box-shadow: 0 1px 1px rgba(0,0,0,0.15); 
          position: relative; 
          font-size: 1rem; 
        }

        .msg-sent .bubble { background: #d9fdd3; border-top-right-radius: 0; color: #111b21; }
        .msg-received .bubble { background: #fff; border-top-left-radius: 0; color: #111b21; }
        
        .meta { display: flex; justify-content: space-between; font-size: 0.8rem; color: #667781; margin-bottom: 5px; gap: 20px; }
        
        .input-area { padding: 20px 40px; background: #f0f2f5; display: flex; gap: 15px; align-items: center; }
        .input-area input { flex: 1; border: none; padding: 15px 20px; border-radius: 10px; outline: none; font-size: 1.05rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .input-area button { background: #0080ff; color: white; border: none; padding: 12px 40px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1rem; }
        .input-area button:hover { background: #0070e0; }

        .back-link { padding: 20px; color: #8696a0; text-decoration: none; border-top: 1px solid #202c33; text-align: center; }
        .back-link:hover { color: #fff; }
      `}</style>

      <div className="sidebar">
        <h3>Scholarship Rooms</h3>
        <div className="room-list">
          {scholarships.map((s, i) => (
            <div key={i} className={`room-item ${room === s ? "active" : ""}`} onClick={() => joinRoom(s)}>
              # {s}
            </div>
          ))}
        </div>
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
      </div>

      <div className="chat-window">
        {room ? (
          <>
            <div className="chat-header">
              <strong style={{ fontSize: '1.2rem' }}># {room}</strong>
              <span style={{ color: '#06d755', fontWeight: 'bold' }}>● Live Chat</span>
            </div>
            <div className="messages-display">
              {chatLog.map((msg, i) => (
                <div key={i} className={`msg-row ${msg.userId === studentId ? "msg-sent" : "msg-received"}`}>
                  <div className="bubble">
                    <div className="meta">
                      <b style={{ color: msg.userId === studentId ? '#0080ff' : '#075e54' }}>{msg.author}</b> 
                      <span>{msg.time}</span>
                    </div>
                    <div className="text">{msg.message}</div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
            <form className="input-area" onSubmit={sendMessage}>
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message # ${room}`} />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div style={{ margin: 'auto', textAlign: 'center', color: '#667781' }}>
            <h2 style={{ opacity: 0.3, fontSize: '4rem' }}>💬</h2>
            <h3 style={{ fontWeight: 'normal' }}>Select a scholarship room to start chatting</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;