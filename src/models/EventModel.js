const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },

		date: { type: Date, required: true },
		endDate: { type: Date }, // optional, useful for multi-day events
		time: { type: String },

		location: { type: String },
		isOnline: { type: Boolean, default: false },

		category: { type: String },
		tags: [String], // e.g., ["MERN", "Workshop"]

		price: {
			type: Number,
			default: 0,
		},
		isFree: {
			type: Boolean,
			default: true,
		},
		totalSeats: {
			type: Number,
			default: 100,
		},

		organizer: {
			type: String,
			default: "Organizer Info Coming Soon",
		},

		img: { type: String, required: true },

		status: {
			type: String,
			enum: ["upcoming", "ongoing", "completed", "cancelled"],
			default: "upcoming",
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Event", EventSchema);
