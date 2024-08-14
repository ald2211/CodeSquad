import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../api/service";

const ProfileBox = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    getProfileData(currentUser.data._id)
      .then((res) => setProfileData(res.data.count))
      .catch((err) => console.log(err));
  }, []);

  let progressWidth;
  switch (parseInt(profileData)) {
    case 1:
      progressWidth = "40%";
      break;
    case 2:
      progressWidth = "60%";
      break;
    case 3:
      progressWidth = "80%";
      break;
    case 4:
      progressWidth = "100%";
      break;
    default:
      progressWidth = "20%";
      break;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
      <img
        src={currentUser?.data?.avatar}
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mb-4 hover:opacity-85 cursor-pointer"
        onClick={() => navigate("/profile")}
      />
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        {currentUser?.data?.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{currentUser?.data?.role}</p>
      <div className="w-full">
        <span className="text-sm text-gray-600">Profile</span>
        <div className="bg-gray-300 h-2 rounded-full mt-1">
          {currentUser.data.role === "client" ? (
            currentUser.data.summary === "" ? (
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: "40%" }}
              ></div>
            ) : (
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: "100%" }}
              ></div>
            )
          ) : (
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: progressWidth }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
