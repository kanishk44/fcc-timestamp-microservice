// index.js
// where your node app starts

// init project
var express = require('express')
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let dateObject;

  if (!date) {
    // If the date parameter is empty, return current time
    dateObject = new Date();
    const response = {
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    };
    return res.json(response);
  }

  if (/^\d{13}$/.test(date)) {
    // If the date is a Unix timestamp in milliseconds
    const timestamp = parseInt(date);
    dateObject = new Date(timestamp);
  } else {
    // If the date can be parsed by new Date(date_string)
    dateObject = new Date(date);
  }

  if (isNaN(dateObject.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  const response = {
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  };

  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
