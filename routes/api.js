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
	// Get input from body parameters
	let phone = req.body.phone;
	let age = req.body.age;
	let terms = req.body.terms;

	// Check phone
	if (!phone) {
		res.status(404);
		return res.send(JSON.stringify({ success: false, message: 'Please enter your phone.'}));
	}

	// Check age confirmed
	if (age != 1) {
		res.status(404);
		return res.send(JSON.stringify({ success: false, message: 'Please confirm your age.'}));
	}
	// Check terms accepted
	if (terms != 1) {
		res.status(404);
		return res.send(JSON.stringify({ success: false, message: 'Please accept terms & conditions.'}));
	}

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

	// Initialize the client call
	let clientCall = client.api.messages.create({
    	to: phone,
    	from: t_number,
    	body: message,
  	});
	// Get client promise
  	clientCall.then(function(call) {
  		res.status(200);
	    return res.send(JSON.stringify({ success: true, message: 'SMS Sent!'}));
	}, function(error) {
		res.status(400);
	    return res.send(JSON.stringify({ success: false, message:  (error.message || 'Something went wrong!')}));
	});

	// Fallback
	res.status(200);
	return res.send(JSON.stringify({ success: true }));
});

module.exports = router;
