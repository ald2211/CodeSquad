import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Public from "./pages/Public";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Committed from "./pages/Committed";
import Closed from "./pages/Completed";
import ProtectedRoute from "./components/PrivateRoutes/ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import AdminOnly from "./components/PrivateRoutes/AdminOnly";
import UserManagement from "./pages/UserManagement";
import ProjectManagement from "./pages/ProjectManagement";
import PaymentManagement from "./pages/PaymentManagement";
import VideoCall from "./components/VideoCall";
import AdminVideoConference from "./components/AdminVideoConference";
import AdminChat from "./components/AdminChat";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      {currentUser && <Navbar />}

      <Routes>
        {!currentUser ? (
          <>
            <Route path="/" element={<Public />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/signup" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<Navigate to="/home" replace />} />
            <Route
              path="/resetPassword/:token"
              element={<Navigate to="/home" replace />}
            />
          </>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/committed" element={<Committed />} />
          <Route path="/closed" element={<Closed />} />
          <Route
            path="/room/:roomId/:userId/:userName"
            element={<VideoCall />}
          />
          <Route element={<AdminOnly />}>
            <Route path="/admin/userManagement" element={<UserManagement />} />
            <Route
              path="/admin/projectManagement"
              element={<ProjectManagement />}
            />
            <Route
              path="/admin/paymentManagement"
              element={<PaymentManagement />}
            />
            <Route
              path="/admin/videoConference"
              element={<AdminVideoConference />}
            />
            <Route path="/admin/chat" element={<AdminChat />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
