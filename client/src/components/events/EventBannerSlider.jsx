import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventBannerSlider = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Make the API call to fetch events
                const response = await axios.get(
                    "https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/GetAllEvents"
                );
                // console.log("API Response:", response.data); // Log the API response for debugging

                // Access the "data" field from the response
                const eventsData = response.data.data;

                // Filter out only "upcoming" events
                const upcomingEvents = eventsData.filter(
                    (event) => event.status === "upcoming"
                );
                // console.log("Upcoming Events:", upcomingEvents); // Log the filtered events for debugging

                // Set the events to display (only first 4 events)
                setEvents(upcomingEvents.slice(0, 4));
            } catch (error) {
                console.error("Error fetching events:", error); // Log error to console
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="container py-5">
                <div>Loading...</div> {/* Show loading text or spinner */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="text-danger">{error}</div>{" "}
                {/* Show error message */}
            </div>
        );
    }

    return (
        <div
            id="eventBannerCarousel"
            className="container carousel slide carousel-fade hero-bg"
            data-bs-ride="carousel"
        >
            <div className="carousel-indicators">
                {events.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#eventBannerCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner py-5">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${
                            index === 0 ? "active" : ""
                        }`}
                        data-bs-interval="8000"
                    >
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6 text-center text-md-start p-4">
                                    <h2 className="display-5 fw-bold">
                                        {event.title}
                                    </h2>
                                    <p className="lead">{event.description}</p>
                                    <Link
                                        to={`/event-details/${event._id}`}
                                        className="btn btn-primary px-4"
                                    >
                                        View Event
                                    </Link>
                                </div>
                                <div className="col-md-6 text-center p-4">
                                    <img
                                        src={event.img}
                                        className="img-fluid rounded shadow"
                                        alt={event.title}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#eventBannerCarousel"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#eventBannerCarousel"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default EventBannerSlider;
