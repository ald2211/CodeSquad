import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllMessages, sendMessage } from '../../api/service';
import { Failed } from '../../helper/popup';
import { useSocketContext } from '../../context/socketContext';

const ChatBox = ({ receiver, close }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const lastMessageRef = useRef(null);
  const  {socket}=useSocketContext()

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
        console.log('newmsg:',newMessage)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage.message, sender: newMessage.senderId, time: newMessage.updatedAt },
      ]);
    });
  
    return () => socket?.off('newMessage');
  }, [socket,setMessages,messages]);
  

  useEffect(() => {
    getAllMessages(receiver)
      .then((res) => {
        const userMessages = res.data.messages.map((message) => ({
          text: message.message,
          sender: message.senderId,
          time: message.updatedAt,
        }));
        setMessages(userMessages);
      })
      .catch((err) => {
        Failed(err.message);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const res = await sendMessage(receiver, { message: newMessage });

      if (res.data.success) {
        setMessages([...messages, { text: res.data.newMessage.message, sender: res.data.newMessage.senderId, time: res.data.newMessage.updatedAt }]);
        setNewMessage('');
      }
    } catch (err) {
      console.log('Error sending message:', err);
      Failed(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
      {/* Chat Header */}
      <div className="bg-indigo-600 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Chat</h2>
        <button onClick={() => close(false)} className="text-white focus:outline-none hover:text-gray-200">
          &#10005;
        </button>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-80 overflow-y-auto space-y-3">
        {messages?.length > 0 ? (
          messages.map((message, index) => {
            const messageTime = new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div
                key={index}
                className={` px-4 py-2 rounded-lg ${
                  message.sender === currentUser.data._id
                    ? 'bg-indigo-100 self-end text-right ml-auto max-w-fit'
                    : 'bg-gray-200 self-start text-left max-w-fit'
                }`}
              >
                <div className="text-sm">{message.text}</div>
                <div className="text-xs text-gray-500">{messageTime}</div>
                {index === messages.length - 1 && <div ref={lastMessageRef} />}
              </div>
            );
          })
        ) : (
          <h1 className='text-center mt-14'>Drop a message</h1>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage}>
        <div className="border-t border-gray-200 p-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none transition duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(ChatBox);
