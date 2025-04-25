import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllEventsPage from "./pages/AllEventsPage";
import MyEventsPage from "./pages/MyEventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegisterPage";
import CreateEventPage from "./pages/CreateEventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/all-events" element={<AllEventsPage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
                <Route
                    path="/event-details/:id"
                    element={<EventDetailsPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/update-event/:id" element={<UpdateEventPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
