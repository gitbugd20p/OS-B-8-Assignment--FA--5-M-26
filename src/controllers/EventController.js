const {
	CreateEventService,
	DeleteEventService,
	UpdateEventService,
	GetAllEventsService,
	GetEventByIdService,
	GetEventsByUserService
} = require('../services/EventServices');

exports.CreateEvent = async (req, res) => {
	let result = await CreateEventService(req);
	return res.status(200).json(result);
}

exports.DeleteEvent = async (req, res) => {
	let result = await DeleteEventService(req);
	return res.status(200).json(result);
}

exports.UpdateEvent = async (req, res) => {
	let result = await UpdateEventService(req);
	return res.status(200).json(result);
}

exports.GetAllEvents = async (req, res) => {
	let result = await GetAllEventsService(req);
	return res.status(200).json(result);
}

exports.GetEventById = async (req, res) => {
	let result = await GetEventByIdService(req);
	return res.status(200).json(result);
}

exports.GetMyEvents = async (req, res) => {
	let result = await GetEventsByUserService(req);
	return res.status(200).json(result);
}
