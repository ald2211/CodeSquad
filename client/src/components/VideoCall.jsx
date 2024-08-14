import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Failed } from "../helper/popup";
const VideoCall = () => {
  const { roomId, userId, userName } = useParams();

  const meetingUI = async (element) => {
    const appId = import.meta.env.VITE_ZEGOCLOUD_APP_ID;
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET;

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        parseInt(appId),
        serverSecret,
        roomId,
        userId,
        userName
      );

      const ui = ZegoUIKitPrebuilt.create(kitToken);
      ui.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        branding: {
          logoURL: "http://localhost:5173/codeSquadLogo.png",
        },
        onReturnToHomeScreenClicked: () => window.close(),
      });
    } catch (err) {
      Failed(err.message);
    }
  };

  return (
    <>
      <div className=" pb-[583px]  bg-white flex flex-col items-center ">
        <div
          ref={meetingUI}
          className="w-full bg-black absolute h-screen z-50 top-0"
        ></div>
      </div>
    </>
  );
};

export default VideoCall;
