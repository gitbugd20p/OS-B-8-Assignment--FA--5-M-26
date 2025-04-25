// src/components/events/EventList.jsx

import React, { useEffect } from 'react';
import EventStore from '../../store/EventStore';
import EventCard from './EventCard';
import SliderSkeleton from '../../skeleton/SliderSkeleton'; // You can replace this with your skeleton loader

const EventList = () => {
  const { EventListRequest, EventList } = EventStore();

  useEffect(() => {
    // Fetch events when the component mounts
    EventListRequest();
  }, [EventListRequest]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      <div className="row">
        {/* Check if the EventList is empty or still loading */}
        {EventList.length === 0 ? (
          <SliderSkeleton /> // Show skeleton loader if no events are available
        ) : (
          EventList.map((event) => (
            <div key={event._id} className="col-12 col-md-4 mb-4">
              <EventCard event={event} /> {/* Render each event card */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
