// src/pages/UpdateEventPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import EventUpdateForm from "../components/events/EventUpdateForm";

const UpdateEventPage = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`/api/v1/GetEventDetails/${id}`);
                if (res.data.status === "success") {
                    setEventData(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [id]);

    return (
        <Layout>
            {eventData ? (
                <EventUpdateForm initialData={eventData} />
            ) : (
                <div className="text-center p-5">Loading event...</div>
            )}
        </Layout>
    );
};

export default UpdateEventPage;
