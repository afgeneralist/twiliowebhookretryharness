const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
  extended: true  
}));  

const port = 3000;

//Object Inspector. 
const inspect = obj => {
 for (const prop in obj) {
   if (obj.hasOwnProperty(prop)) {
     console.log(`${prop}: ${obj[prop]}`);
   }
 }
};

/*This Express harness is helpful for testing the behavior of Twilio's Alerts
/*when you set custom response status codes. This is relevant when you want to
/*see how Twilio's webhook overrides function, how we facilitate retries
etc.*/

//route for debugger webhook
app.post('/dwebhook', (req, res) => {
  let status = 200;
  console.log(`debugger webhook: ${req.body.MessageStatus}`);
  res.sendStatus(status);
  })


//Incoming SMS with 502 response on Request URL 
app.post('/request', (req, res) => {
  let status = 502;
  console.log(`requestURL: ${req.body.MessageSid}`);
  res.sendStatus(status);
  })

//Incoming SMS with 502 response on Fallback URL
app.post('/fallback', (req, res) => {
  let status = 502;
  console.log(`falloverURL: ${req.body.MessageSid}`);
  //inspect(req.headers)
  res.sendStatus(status);
  })

  app.post('/fallback200', (req, res) => {
    let status = 200;
    console.log(`fallbackURL success: ${req.body.MessageSid}`);
    res.sendStatus(status);
    })


//route for status_callback
  app.post('/scb', (req, res) => {
    let status = 502;
    console.log(`statuscallback: ${req.body.MessageStatus} + ${req.body.MessageSid}`);
    res.sendStatus(status);
    })

//Timeout with setTime counter. This is helpful when testing webhook overrides
app.post('/scb', (req, res) => {

  function badResponse() {
      
    let status = 502;  
    console.log(`MessageSID:${req.body.MessageStatus} + ${req.body.MessageSid}`);
    res.sendStatus(status);
  }

    setTimeout(badResponse, 3000);
 })

 

app.listen(port, () => console.log(`App listening on ${port}`))
