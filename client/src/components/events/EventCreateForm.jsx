import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EventCreateForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        endDate: "",
        time: "",
        location: "",
        isOnline: false,
        category: "",
        tags: "",
        price: 0,
        totalSeats: 100,
        organizer: "",
        img: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            // Process tags: comma-separated string -> array
            const tagsArray = formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag);

            const payload = {
                ...formData,
                tags: tagsArray,
            };

            const res = await axios.post(
                "https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/CreateEvent",
                payload
            );

            if (res.data.status === "success") {
                toast.success("Event created successfully!");
                navigate("/my-events");
            } else {
                toast.error(res.data.message || "Failed to create event");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
            <h3 className="mb-4 text-center">Create New Event</h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-md-6">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            name="category"
                            className="form-control"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        required
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-4">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="date"
                            required
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-md-4">
                        <label className="form-label">
                            End Date (Optional)
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            className="form-control"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-md-4">
                        <label className="form-label">Time</label>
                        <input
                            type="time"
                            name="time"
                            className="form-control"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-md-6 d-flex align-items-end">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isOnline"
                                name="isOnline"
                                checked={formData.isOnline}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="isOnline"
                            >
                                Online Event
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Price (BDT)</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-md-6">
                        <label className="form-label">Total Seats</label>
                        <input
                            type="number"
                            name="totalSeats"
                            className="form-control"
                            value={formData.totalSeats}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Organizer</label>
                        <input
                            type="text"
                            name="organizer"
                            className="form-control"
                            value={formData.organizer}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-md-6">
                        <label className="form-label">Image URL</label>
                        <input
                            type="text"
                            name="img"
                            required
                            className="form-control"
                            value={formData.img}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        className="form-control"
                        placeholder="e.g., MERN, Workshop, Free"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default EventCreateForm;
