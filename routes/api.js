var express = require('express');
var router = express.Router();
// require the Twilio module and create a REST client
const t_accountSid = process.env.TWILIO_ACCOUNT_SID;
const t_authToken = process.env.TWILIO_AUTH_TOKEN;
const t_number = process.env.TWILIO_NUMBER;
const client = require('twilio')(t_accountSid, t_authToken);

/* GET sms-promotion */
router.post('/sms-promotion', function(req, res, next) {
	// Set Content-Type to json
	res.setHeader('Content-Type', 'application/json');
	// Get phone from body parameters
	let phone = req.body.phone;
	let message = '';
	// Get the current hour
	let hour = new Date().getHours();

	// Switch message
	// If hour is higher or equal to 12 set afternoon message else set morning message
	if (hour >= 12) {
		message = 'Hello! Your promocode is PM456';
	} else {
		message = 'Good morning! Your promocode is AM123';
	}
	// Only proceed if phone exists
	if (phone) {
		// Initialize the client call
		let clientCall = client.api.messages.create({
	    	to: phone,
	    	from: t_number,
	    	body: message,
	  	});
		// Get client promise
	  	clientCall.then(function(call) {
		    return res.send(JSON.stringify({ success: true, message:  'SMS Sent!'}));
		}, function(error) {
		    return res.send(JSON.stringify({ success: false, message:  (error.message || 'Something went wrong!')}));
		});
  	// Phone not found
	} else {
		return res.status(400); // Bad request http error code
		return res.send(JSON.stringify({ success: false, message: 'Phone not found!' }));
	}
	// Fallback
	return res.status(400);
	return res.send(JSON.stringify({ success: false, message: 'Something went wrong!' }));
});

module.exports = router;
