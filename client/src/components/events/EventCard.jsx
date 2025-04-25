import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const userId = localStorage.getItem("user_id"); // Get the logged-in user ID

    return (
        <div className="card h-100 shadow-sm rounded-4 overflow-hidden position-relative">
            {/* Category Badge */}
            <span className="position-absolute top-0 end-0 badge bg-secondary m-2">
                {event.category || "Uncategorized"}
            </span>

            {/* Event Image */}
            <img
                src={event.img || "https://placehold.co/600x400?text=Event+Image"}
                className="card-img-top"
                alt={event.title}
                style={{ objectFit: "cover", height: "200px" }}
            />

            {/* Card Body */}
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title">{event.title}</h5>
                    <p className="text-muted mb-1">{eventDate}</p>
                    <p className="text-muted mb-1">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {event.location || "Location TBA"}
                    </p>
                </div>

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-semibold text-success">
                        {event.price === 0 || event.price === "Free"
                            ? "Free"
                            : `৳ ${event.price || "N/A"}`}
                    </span>
                    <Link
                        to={`/event-details/${event._id}`}
                        className="btn btn-primary btn-sm"
                    >
                        View Details
                    </Link>

                    {/* Edit Button - Only if the user is the creator */}
                    {userId === event.createdBy && (
                        <Link
                            to={`/update-event/${event._id}`}
                            className="btn btn-warning btn-sm ms-2"
                        >
                            Edit
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
