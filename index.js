// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cors = require('cors');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let dateObj;
  
  // Check if the date is provided
  if (!date) {
    // No date parameter, return the current date
    dateObj = new Date();
  } else {
    // Check if the date is a valid number (Unix timestamp)
    if (!isNaN(date)) {
      dateObj = new Date(parseInt(date));
    } else {
      // Otherwise, try to parse it as a date string
      dateObj = new Date(date);
    }
  }

  // Check if date is invalid
  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and UTC string
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
