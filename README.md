# nodejs Twilio send SMS

Installation
_____________________

~~~
git clone https://github.com/frixou89/nodejs-sms-send-code
cd nodejs-sms-send-code
npm install
~~~

Configuration
_____________________

1. Copy `.env.example` contents to `.env`.
2. Fill the envirnoment variables. Example:
	~~~
    #ENVIRONMENT
    NODE_ENV = dev

    #APP
    HOST = localhost
    PORT = 3000

    #TWILIO
    TWILIO_ACCOUNT_SID = <twilio_SID>
    TWILIO_NUMBER = <twilio_number>
    TWILIO_AUTH_TOKEN = <twilio_auth_token>
    ~~~
    
Running
_____________________
To run project there are two scripts available:
1. with `nodemon` installed
    ~~~
    npm run dev
    ~~~
2. normal start
	~~~
    npm run start
    ~~~