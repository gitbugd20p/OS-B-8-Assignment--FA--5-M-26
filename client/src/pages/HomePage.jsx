// src/pages/HomePage.jsx

import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Categories from "../components/events/Categories";
import EventBannerSlider from "../components/events/EventBannerSlider";
import EventCard from "../components/events/EventCard";
import EventStore from "../store/EventStore";

const HomePage = () => {
    const { AllEventsRequest, AllEvents } = EventStore(); // Access event data from EventStore

    useEffect(() => {
        (async () => {
            await AllEventsRequest(); // Fetch all events when the component mounts
        })();
    }, [AllEventsRequest]);

    return (
        <Layout>
            <EventBannerSlider />
            <div className="container m-auto row p-3">
                {AllEvents && AllEvents.length > 0 ? (
                    AllEvents.map((event) => (
                        <div key={event._id} className="col-12 col-md-4 mb-4">
                            <EventCard event={event} />
                        </div>
                    ))
                ) : (
                    <p>No events available at the moment</p> // Show message if no events are available
                )}
            </div>
        </Layout>
    );
};

export default HomePage;
