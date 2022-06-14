// Import Express
const express = require("express");

// Import CORS - Cross Origin Resource Sharing
const cors = require("cors");

// Instantiate app
const app = express();

// Define port API will listen on
const port = 8000;


// Include in order to use POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Import config file to connect to MongoDB using Mongoose
require("./server/config/mongoose.config");


// Import routes
require("./server/routes/ninja.routes")(app);


// Pass port to app.listen
app.listen( port, () => console.log(`We're LIVE on port ${ port }!!! <\(^^<\) <\(^^\)> \(>^^\)>`));