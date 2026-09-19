import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import Workspaces from "./pages/Workspaces";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import MeetingRooms from "./pages/MeetingRooms";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { getBookings, getFavorites, toggleFavorite, getUser, isLoggedIn, logout } from "./utils/bookingUtils";

export default function App() {
  const [bookings, setBookings] = useState(getBookings());
  const [favorites, setFavorites] = useState(getFavorites());
  const [user, setUser] = useState(getUser());
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to WorkSpace! Explore workspaces to get started." },
  ]);
  const [toasts, setToasts] = useState([]);

  const refreshBookings = useCallback(() => setBookings(getBookings()), []);
  const refreshUser = useCallback(() => setUser(getUser()), []);

  function handleToggleFavorite(id) {
    const updated = toggleFavorite(id);
    setFavorites([...updated]);
  }

  function addNotification(message) {
    setNotifications((n) => [{ id: Date.now(), message }, ...n].slice(0, 8));
  }

  function showToast(message, type = "default") {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }

  function handleLogin() {
    setLoggedIn(true);
    refreshUser();
  }

  function handleLogout() {
    logout();
    setLoggedIn(false);
  }

  // Refresh bookings whenever this page regains focus (in case another tab changed localStorage)
  useEffect(() => {
    function onStorage() {
      refreshBookings();
      setFavorites(getFavorites());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refreshBookings]);

  return (
    <>
      <Navbar loggedIn={loggedIn} user={user} notifications={notifications} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/workspaces" element={<Workspaces favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route
          path="/workspaces/:id"
          element={
            <WorkspaceDetails user={user} addNotification={addNotification} showToast={showToast} />
          }
        />
        <Route path="/meeting-rooms" element={<MeetingRooms />} />
        <Route
          path="/bookings"
          element={
            <Bookings
              bookings={bookings}
              refreshBookings={refreshBookings}
              addNotification={addNotification}
              showToast={showToast}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <Dashboard user={user} bookings={bookings} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            loggedIn ? (
              <Profile user={user} bookings={bookings} refreshUser={refreshUser} showToast={showToast} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} showToast={showToast} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} showToast={showToast} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <Toast toasts={toasts} />
    </>
  );
}
