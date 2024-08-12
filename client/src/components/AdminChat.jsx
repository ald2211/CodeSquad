import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './AdminSidebar';
import { getAllMessages, getAllUsers, getUnreadMessages, markRead, sendMessage } from '../api/service';
import { Failed } from '../helper/popup';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../context/socketContext';
import Pagination from './UserTablePagination';
import { Discuss } from 'react-loader-spinner';

const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState('null');
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
  const [unread, setUnread] = useState([]);
  const { socket, onlineUsers } = useSocketContext();
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      console.log('selected:',selectedUser._id,':',newMessage.senderId)
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: newMessage.message,
            sender: newMessage.senderId,
            time: new Date(newMessage.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } if (selectedUser && newMessage.senderId !== selectedUser._id) {
        
        setUnread((prevUnread) => {
          return prevUnread.map((conv) => {
            if (conv.participants.includes(newMessage.senderId)) {
              return {
                ...conv,
                unreadCount: {
                  ...conv.unreadCount,
                  [currentUser.data._id]: (conv.unreadCount[currentUser.data._id] || 0) + 1,
                },
              };
            }
            return conv;
          });
        });
      } 
  
      // Mark the message as read if it’s relevant
      if (selectedUser?._id === newMessage.senderId) {
        markRead(newMessage._id);
      }
    });

    return () => socket?.off('newMessage');
  }, [socket, messages, setMessages]);

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

  useEffect(() => {
    getUnreadMessages()
      .then((res) => {
        setUnread(res?.data.unreadMessages);
      })
      .catch((err) => {
        console.log('noti err:', err);
      });
  }, [selectedUser]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setMessageLoading(true);
    try {
      const res = await getAllMessages(user._id);
      const userMessages = res.data.messages.map((message) => ({
        text: message.message,
        sender: message.senderId,
        time: new Date(message.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));

      setMessages(userMessages);
      setUnread((prevUnread) => {
        return prevUnread.map((conv) => {
          if (conv.participants.includes(user._id)) {
            return {
              ...conv,
              unreadCount: {
                ...conv.unreadCount,
                [currentUser.data._id]: 0,
              },
            };
          }
          return conv;
        });
      });
    } catch (err) {
      console.log('Error fetching messages:', err);
    } finally {
      setMessageLoading(false);
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
          
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="w-full border rounded-full px-4 py-2 mb-4 mt-2"
          />
          <ul>
            {userData.map((user) => {
              const conversation = unread?.find((conv) =>
                conv.participants.includes(user._id)
              );
              const unreadCount = conversation ? conversation.unreadCount[currentUser.data._id] : 0;

              return (
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
                    {unreadCount > 0 && (
                        <span className=" bg-green-500 ml-auto text-white text-xs rounded-full px-2 py-1">
                          {unreadCount}
                        </span>
                      )}
                  </div>
                </li>
              );
            })}
          </ul>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="flex-1 flex flex-col bg-gray-100 h-[calc(100vh-75px)] relative">
          {messageLoading && (
            <Discuss
              visible={true}
              height="80"
              width="80"
              ariaLabel="discuss-loading"
              wrapperStyle={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
              wrapperClass="discuss-wrapper"
              color="#fff"
              backgroundColor="#F4442E"
            />
          )}
          {selectedUser!=='null' ? (
            <>
              <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-2xl font-semibold text-gray-900 pt-3">{selectedUser.name}</h1>
              </div>
              <div className="flex-1 p-4 overflow-y-auto mb-1">
                {(!messageLoading&&messages?.length > 0) ? (
                  messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === currentUser.data._id ? 'justify-end' : 'justify-start'}`}>
                      <div
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 my-2 rounded-lg shadow-md ${message.sender === currentUser.data._id ? 'bg-blue-500 text-white' : 'bg-gray-300 border'}`}
                      >
                        <p className='mb-2'>{message.text}</p>
                        <span className="text-xs text-gray-600">{message.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-center mt-16'>{messageLoading?'fetching Messages...':'No messages'}</p>
                )}
              </div>
              <div className="bg-white border-t p-4">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    Send
                  </button>
                </form>
              </div>
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
