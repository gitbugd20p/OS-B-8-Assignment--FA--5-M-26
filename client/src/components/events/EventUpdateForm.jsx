// src/components/events/EventUpdateForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventUpdateForm = ({ initialData }) => {
    const [formData, setFormData] = useState({ ...initialData });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/UpdateEvent/${formData._id}`,
                formData,
                { withCredentials: true }
            );

            if (res.data.status === "success") {
                alert("Event updated successfully!");
                navigate("/my-events");
            } else {
                alert("Failed to update event.");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("An error occurred.");
        }
    };

    return (
        <form className="container my-5" onSubmit={handleSubmit}>
            <h3 className="mb-4">Update Event</h3>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows={3}
                    required
                />
            </div>

            <div className="row mb-3">
                <div className="col">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date?.slice(0, 10)}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col">
                    <label className="form-label">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate?.slice(0, 10)}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Time</label>
                <input
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="isOnline"
                    checked={formData.isOnline}
                    onChange={handleChange}
                />
                <label className="form-check-label">Online Event</label>
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Tags (comma-separated)</label>
                <input
                    name="tags"
                    value={
                        Array.isArray(formData.tags)
                            ? formData.tags.join(", ")
                            : ""
                    }
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            tags: e.target.value
                                .split(",")
                                .map((tag) => tag.trim()),
                        }))
                    }
                    className="form-control"
                />
            </div>

            <div className="row mb-3">
                <div className="col">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <label className="form-label">Total Seats</label>
                    <input
                        type="number"
                        name="totalSeats"
                        value={formData.totalSeats}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Organizer</label>
                <input
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Update Event
            </button>
        </form>
    );
};

export default EventUpdateForm;
