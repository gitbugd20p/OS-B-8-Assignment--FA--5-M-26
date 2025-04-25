const EventModel = require('../models/EventModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Create a new event
const CreateEventService = async (req) => {
	try {
		const userID = new ObjectId(req.headers.user_id);
		const reqBody = req.body;

		// Attach the logged-in user ID
		reqBody.createdBy = userID;

		// Optional: auto-set isFree based on price if not passed from frontend
		if ("price" in reqBody) {
			reqBody.isFree = Number(reqBody.price) === 0;
		}

		const data = await EventModel.create(reqBody);
		return {
			status: "success",
			message: "Event Created Successfully",
			data: data,
		};
	} catch (e) {
		return {
			status: "fail",
			message: "Failed to Create Event",
			data: e.toString(),
		};
	}
};


// Get all events (public)
const GetAllEventsService = async () => {
	try {
		const data = await EventModel.find().sort({ createdAt: -1 });
		return { status: "success", data: data };
	} catch (e) {
		return { status: "fail", data: e.toString() };
	}
};

// Get a single event by ID
const GetEventByIdService = async (req) => {
	try {
		const id = req.params.id;
		const data = await EventModel.findById(id);
		if (!data) {
			return { status: "fail", message: "Event not found" };
		}
		return { status: "success", data: data };
	} catch (e) {
		return { status: "fail", data: e.toString() };
	}
};

// Update an event by ID
const UpdateEventService = async (req) => {
	try {
		const id = req.params.id;
		const updateData = req.body;

		const result = await EventModel.updateOne(
			{ _id: id, createdBy: new ObjectId(req.headers.user_id) },
			{ $set: updateData }
		);

		if (result.modifiedCount === 0) {
			return { status: "fail", message: "Event not updated or not authorized" };
		}

		return { status: "success", message: "Event updated successfully" };
	} catch (e) {
		return { status: "fail", data: e.toString() };
	}
};

// Delete an event by ID
const DeleteEventService = async (req) => {
	try {
		const id = req.params.id;

		const result = await EventModel.deleteOne({
			_id: id,
			createdBy: new ObjectId(req.headers.user_id)
		});

		if (result.deletedCount === 0) {
			return { status: "fail", message: "Event not found or not authorized" };
		}

		return { status: "success", message: "Event deleted successfully" };
	} catch (e) {
		return { status: "fail", data: e.toString() };
	}
};

const GetEventsByUserService = async (req) => {
	try {
		let userID = new ObjectId(req.headers.user_id);
		let events = await EventModel.find({ createdBy: userID });

		return {
			status: "success",
			message: "Events fetched successfully.",
			data: events
		};
	} catch (e) {
		return {
			status: "fail",
			message: "Unable to fetch your events.",
			error: e.toString()
		};
	}
};


module.exports = {
	CreateEventService,
	DeleteEventService,
	UpdateEventService,
	GetAllEventsService,
	GetEventByIdService,
	GetEventsByUserService
};
