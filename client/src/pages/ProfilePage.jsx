// src/pages/ProfilePage.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import EventStore from "../store/EventStore";
import EventCard from "../components/events/EventCard";

const ProfilePage = () => {
    const { MyEvents, MyEventsRequest } = EventStore();

    useEffect(() => {
        // Fetch just your events for the dashboard
        MyEventsRequest();
    }, []);

    const userId = localStorage.getItem("user_id");
    const email = localStorage.getItem("email"); // if you stored that on login

    return (
        <Layout>
            <div className="container py-5">
                {/* Profile Info */}
                <div className="mb-5">
                    <h1 className="mb-3">Your Dashboard</h1>
                    {/* <p>
                        <strong>User ID:</strong> {userId}
                    </p> */}
                    {/* {email && (
                        <p>
                            <strong>Email:</strong> {email}
                        </p>
                    )} */}
                </div>

                {/* Quick Actions */}
                <div className="row mb-5">
                    <div className="col-md-4 mb-3">
                        <Link
                            to="/my-events"
                            className="card h-100 text-decoration-none text-dark"
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">My Events</h5>
                                <p className="card-text">
                                    View &amp; manage events you created
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 mb-3">
                        <Link
                            to="/create-event"
                            className="card h-100 text-decoration-none text-dark"
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">Create Event</h5>
                                <p className="card-text">
                                    Add a brand new event
                                </p>
                            </div>
                        </Link>
                    </div>
                    {/* Total Events Card */}
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 text-decoration-none text-dark">
                            <div className="card-body text-center">
                                <h5 className="card-title">Total Events</h5>
                                <p className="card-text display-6">
                                    {MyEvents ? MyEvents.length : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Edit Profile Card - Coming Soon */}
                    {/*
                    <div className="col-md-4 mb-3">
                        <Link
                            to="/profile"
                            className="card h-100 text-decoration-none text-dark"
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">Edit Profile</h5>
                                <p className="card-text">
                                    Update your account info
                                </p>
                            </div>
                        </Link>
                    </div>
                    */}
                </div>

                {/* Your Events Preview */}
                <h2 className="mb-4">Your Events</h2>
                <div className="row">
                    {MyEvents && MyEvents.length > 0 ? (
                        MyEvents.map((evt) => (
                            <div key={evt._id} className="col-md-4 mb-4">
                                <EventCard event={evt} />
                            </div>
                        ))
                    ) : (
                        <p>You haven’t created any events yet.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
