import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Failed, Success } from "../helper/popup";
import { OAuthLogin } from "../api/service";

const OAuth = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const user_details = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role,
      };
      const res = await OAuthLogin(user_details)
      const data = res.data || "nill";
      console.log("data:", data);
      dispatch(signinSuccess(data));
      navigate("/home");
      Success("Welcome to CodeSquad");
    } catch (err) {
      console.log("auth signin failed:", err);
      Failed("google Sign In failed");
    }
  };

  const handleGitHubAuth = async () => {
    try {
      const provider = new GithubAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("githubResult:", result);
      const user_details = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role,
      };
      const res = await OAuthLogin(user_details)
      const data = res.data || "nill";
      console.log("data:", data);
      dispatch(signinSuccess(data));
      navigate("/home");
      Success("Welcome to CodeSquad");
    } catch (err) {
      console.log("gitHubError:", err);
      Failed("GitHub Sign In failed");
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="w-full text-sm mt-8 flex  items-center justify-center rounded-md border p-2 outline-none ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-blue-400 hover:text-white"
      >
        <img
          className="mr-2 h-5"
          src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
          alt="google_image"
        />
        Log in with Google
      </button>
      <button
        type="button"
        onClick={handleGitHubAuth}
        className="w-full text-sm mt-3 flex  items-center justify-center rounded-md border p-2 outline-none  ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-blue-400 hover:text-white"
      >
        <img
          className="mr-2 h-5"
          src="https://www.cdnlogo.com/logos/g/69/github-icon.svg"
          alt="linkedin_image"
        />
        Log in with GitHub
      </button>
    </div>
  );
};

export default OAuth;
