import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const Chat = () => {
  const { userId: otherUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);

    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('join', user.id);

    newSocket.on('receiveMessage', (message) => {
      if (message.sender_id === parseInt(otherUserId)) {
        setMessages(prev => [...prev, message]);
      }
    });

    fetchMessages();

    return () => newSocket.close();
  }, [otherUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/messages/${otherUserId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to fetch messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/messages',
        { receiverId: otherUserId, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const messageData = {
        ...response.data,
        sender_id: currentUser.id,
        receiver_id: parseInt(otherUserId)
      };

      setMessages(prev => [...prev, messageData]);
      socket.emit('sendMessage', messageData);
      setNewMessage('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send message');
    }
  };

  return (
    <div className="container dashboard-container">
      <div className="header">
        <h2>Chat</h2>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender_id === currentUser?.id ? 'message-sent' : 'message-received'}`}
            >
              <div>{msg.message}</div>
              <div className="message-time">
                {new Date(msg.created_at).toLocaleString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
