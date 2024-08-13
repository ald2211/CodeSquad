import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { deleteAllNotfication, deleteSpecificNotification, getNotification } from "../../api/service";


const NotificationDropdown = ({newNotification}) => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    setNotifications((prevNotification) => [
      ...prevNotification,
      newNotification,
    ]);
  }, [newNotification]); 
  

  useEffect(() => {
    const getUserNotifications = async () => {
      const res = await getNotification();
      setNotifications(res.data.notifications);
    };
    getUserNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
        setNotifications((prev) => prev.filter((notif) => notif._id !== id));
       deleteSpecificNotification(id);
     
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleClearAll = async () => {
    try {
        setNotifications([]);
       deleteAllNotfication();
      
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <div className="relative group mr-4">
      <IoMdNotificationsOutline className="w-6 h-6 cursor-pointer text-gray-600" />
      {notifications.length>0&&
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5  rounded-full">
      {notifications.length}
    </span>
      }
      <div className="absolute right-0 mt-2 min-w-[200px] max-w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="px-4 py-2 flex justify-between items-center text-sm text-gray-800 hover:bg-blue-50"
                title={notif.message} 
              >
                <span className="flex-1 truncate">{notif.message}</span>
                <AiOutlineClose
                  className="cursor-pointer text-gray-500 hover:text-red-500 ml-2"
                  onClick={() => handleDelete(notif._id)}
                />
              </div>
            ))}
            <div
              className="px-4 py-2 text-sm text-center text-gray-800 hover:bg-red-50 cursor-pointer"
              onClick={handleClearAll}
            >
              Clear All
            </div>
          </>
        ) : (
          <div className="px-4 py-2 text-sm text-gray-800">No new notifications</div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
