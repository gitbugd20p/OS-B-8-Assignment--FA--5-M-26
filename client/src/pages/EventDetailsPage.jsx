import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EventStore from '../store/EventStore';
import Layout from '../components/layout/Layout';
import { Spinner } from 'react-bootstrap'; // Using Bootstrap's Spinner for loading state
import axios from 'axios'; // For making HTTP requests

const EventDetailsPage = () => {
  const { id } = useParams();
  const { SingleEventRequest, SingleEvent } = EventStore();
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any error
  const navigate = useNavigate(); // For navigation after delete

  const userId = localStorage.getItem("user_id"); // Get logged-in user ID

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        await SingleEventRequest(id);
      } catch (err) {
        setError('Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  // Handle event deletion
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.delete(`/api/v1/DeleteEvent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Notify success
      alert(response.data.message); // Assuming success message is in response.data.message

      // Redirect to events list page
      navigate("/my-events");  // Adjust this to your events listing page
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting the event.");
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <p className="text-center py-5 text-danger">{error}</p>
      ) : SingleEvent ? (
        <div className="container py-4">
          <div className="row">
            <div className="col-md-6">
              <img
                src={SingleEvent.img}
                alt={SingleEvent.title}
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2>{SingleEvent.title}</h2>
              <p className="text-muted">{SingleEvent.category}</p>
              <p><strong>Date:</strong> {new Date(SingleEvent.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {SingleEvent.time}</p>
              <p><strong>Location:</strong> {SingleEvent.isOnline ? "Online" : SingleEvent.location}</p>
              <p><strong>Organizer:</strong> {SingleEvent.organizer}</p>
              <p><strong>Price:</strong> {SingleEvent.isFree ? "Free" : `৳${SingleEvent.price}`}</p>
              <p><strong>Total Seats:</strong> {SingleEvent.totalSeats}</p>
              <p>{SingleEvent.description}</p>
              {SingleEvent.tags && SingleEvent.tags.length > 0 && (
                <div>
                  <strong>Tags: </strong>
                  {SingleEvent.tags.map((tag, idx) => (
                    <span key={idx} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Check if the current user is the creator of the event */}
              {SingleEvent.createdBy === userId && (
                <div className="mt-4">
                  <Link to={`/update-event/${id}`} className="btn btn-warning btn-sm me-2">
                    Edit Event
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="btn btn-danger btn-sm"
                  >
                    Delete Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center py-5">Event not found.</p>
      )}
    </Layout>
  );
};

export default EventDetailsPage;
