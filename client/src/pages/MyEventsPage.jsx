import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import EventStore from '../store/EventStore';
import EventCard from '../components/events/EventCard';

const MyEventsPage = () => {
  const { MyEventsRequest, MyEvents } = EventStore();

  useEffect(() => {
    (async () => {
      await MyEventsRequest();
    })();
  }, []);

  return (
    <Layout>
      <h2 className="my-4 text-center">My Events</h2>
      <div className="row">
        {MyEvents && MyEvents.length > 0 ? (
          MyEvents.map((event) => (
            <div key={event._id} className="col-12 col-md-4 mb-4">
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p className="text-center">You haven't created any events yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default MyEventsPage;
