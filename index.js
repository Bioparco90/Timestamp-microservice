// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let timestamp;
  let utc;

  // Se il parametro non è fornito, restituisci l'ora corrente
  if (!date) {
    const today = new Date();
    const todayUnix = today.getTime();
    const todayUtc = today.toUTCString();
    return res.json({
      "unix": todayUnix,
      "utc": todayUtc
    });
  }

  // Verifica se il parametro è una stringa numerica (timestamp)
  if (!isNaN(date)) {
    try {
      timestamp = parseInt(date);
      const dateFormat = new Date(timestamp);
      utc = dateFormat.toUTCString();

      if (utc === "Invalid Date") {
        throw new Error("Invalid Date");
      }
    } catch (e) {
      return res.json({ "error": "Invalid Date" });
    }
  } else {
    try {
      const dateFormat = new Date(date);
      utc = dateFormat.toUTCString();
      timestamp = dateFormat.getTime();

      if (utc === "Invalid Date") {
        throw new Error("Invalid Date");
      }
    } catch (e) {
      return res.json({ "error": "Invalid Date" });
    }
  }

  res.json({
    "unix": timestamp,
    "utc": utc
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
