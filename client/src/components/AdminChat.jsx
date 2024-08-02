import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './AdminSidebar';
import { getAllMessages, getAllUsers, sendMessage } from '../api/service';
import { Failed } from '../helper/popup';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../context/socketContext';
import Pagination from './UserTablePagination';

const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const lastMessageRef = useRef();
  const { socket, onlineUsers } = useSocketContext();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage.message, sender: newMessage.senderId, time: new Date(newMessage.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    });

    return () => socket?.off('newMessage');
  }, [socket,messages,setMessages]);

  useEffect(() => {
    getAllUsers(currentPage, itemsPerPage, search)
      .then((res) => {
        const { data, totalPages, totalItems } = res.data;
        setUserData(data);
        setTotalPages(totalPages);
        setTotalItems(totalItems);
      })
      .catch((err) => console.log(err));
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    if (lastMessageRef.current) {
      // Scroll the parent element to the top
      const parentElement = lastMessageRef.current.parentElement;
      parentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  
      // Scroll the child element (or the container) to the bottom
      const childElement = lastMessageRef.current;
      childElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    try {
      const res = await getAllMessages(user._id);

      const userMessages = res.data.messages.map((message) => ({
        text: message.message,
        sender: message.senderId,
        time: new Date(message.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));

      setMessages(userMessages);
    } catch (err) {
      console.log('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const res = await sendMessage(selectedUser._id, { message: newMessage });

      if (res.data.success) {
        setMessages([...messages, {
          text: res.data.newMessage.message,
          sender: res.data.newMessage.senderId,
          time: new Date(res.data.newMessage.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }

      setNewMessage('');
    } catch (err) {
      console.log('Error sending message:', err);
      Failed(err.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-row h-screen mt-[80px] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-row">
        <div className="w-1/3 bg-white border-r p-1 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Search Users</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="w-full border rounded-full px-4 py-2 mb-4"
          />
          <ul>
            {userData.map((user) => (
              <li
                key={user._id}
                onClick={() => handleSelectUser(user)}
                className={`cursor-pointer p-4 ${selectedUser?._id === user._id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-black mr-3 object-cover" />
                    <span
                      className={`absolute bottom-7 left-8 block w-2 h-2 rounded-full ${onlineUsers.includes(user._id) ? 'bg-green-500' : 'bg-gray-400'}`}
                      title={onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm">{user.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
               totalPages={totalPages}
               currentPage={currentPage}
               onPageChange={handlePageChange}
              />
        </div>
        <div className="flex-1 flex flex-col bg-gray-100 h-[calc(100vh-75px)]">
          {selectedUser ? (
            <>
              <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-2xl font-semibold text-gray-900 pt-3">{selectedUser.name}</h1>
              </div>
              <div className="flex-1 p-4 overflow-y-auto mb-1">
                {messages?.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === currentUser.data._id ? 'justify-end' : 'justify-start'}`}>
                      <div
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 my-2 rounded-lg shadow-md ${message.sender === currentUser.data._id ? 'bg-blue-500 text-white' : 'bg-gray-300 border'}`}
                      >
                        <p className='mb-2'>{message.text}</p>
                        <span className="text-xs text-white">{message.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center mt-[160px] text-gray-400">Start a chat</h1>
                )}
              </div>
              <form className="flex items-center p-4 bg-white border-t" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 border rounded-full px-4 py-2 mr-2  focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
