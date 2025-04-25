const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');
const AuthVerification = require('../middlewares/AuthVerification');


// ========== 👤 USER ROUTES ==========

// Register a new user
router.post('/Register', UserController.Register);

// Login
router.get('/VerifyLogin/:email/:password', UserController.VerifyLogin);

// Logout
router.get('/UserLogout', AuthVerification, UserController.UserLogout);


/// ========== 📅 EVENT ROUTES ==========

// Get all events (publicly accessible)
router.get('/GetAllEvents', EventController.GetAllEvents);

// Create a new event (only for logged-in users)
router.post('/CreateEvent', AuthVerification, EventController.CreateEvent);

// Get single event details
router.get('/GetEventDetails/:id', EventController.GetEventById);

// Get all events by the logged-in user
router.get('/GetMyEvents', AuthVerification, EventController.GetMyEvents);

// Update an event (only creator can update)
router.post('/UpdateEvent/:id', AuthVerification, EventController.UpdateEvent);

// Delete an event
router.delete('/DeleteEvent/:id', AuthVerification, EventController.DeleteEvent);

module.exports = router;
