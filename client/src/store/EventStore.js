// src/store/EventStore.js
import { create } from 'zustand';
import axios from 'axios';

const EventStore = create((set) => ({
	FeaturedEvents: null,
	AllEvents: null,
	SingleEvent: null,

	// Fetch all events
	AllEventsRequest: async () => {
		try {
			const res = await axios.get('https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/GetAllEvents');
			if (res.data.status === "success") {
				set({ AllEvents: res.data.data });
			}
		} catch (e) {
			console.error("Error fetching all events:", e);
		}
	},

	// Fetch single event by ID
	SingleEventRequest: async (id) => {
		try {
			const res = await axios.get(`https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/GetEventDetails/${id}`);
			if (res.data.status === "success") {
				set({ SingleEvent: res.data.data });
			}
		} catch (e) {
			console.error("Error fetching event details:", e);
		}
	},
	MyEvents: null,

	MyEventsRequest: async () => {
		try {
			const res = await axios.get('https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/GetMyEvents', { withCredentials: true });
			if (res.data.status === "success") {
				set({ MyEvents: res.data.data });
			}
		} catch (e) {
			console.error("Error fetching your events:", e);
		}
	},

}));

export default EventStore;
