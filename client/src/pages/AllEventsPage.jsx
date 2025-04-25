import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import EventStore from '../store/EventStore';
import EventCard from '../components/events/EventCard';

const AllEventsPage = () => {
  const { AllEventsRequest, AllEvents } = EventStore();

  useEffect(() => {
    (async () => {
      await AllEventsRequest();
    })();
  }, []);

  return (
    <Layout>
      <h2 className="my-4 text-center">All Events</h2>
      <div className="row">
        {AllEvents && AllEvents.length > 0 ? (
          AllEvents.map((event) => (
            <div key={event._id} className="col-12 col-md-4 mb-4">
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p className="text-center">No events found.</p>
        )}
      </div>
    </Layout>
  );
};

export default AllEventsPage;
