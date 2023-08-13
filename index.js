// Load the express module
const express = require('express');
// Create an instance of express
const app = express();
// Create an instance of a Router
const router = express.Router();
// Specify the port to use for the server
const port = 3000;

// Mount routes from modules
router.use('/product', require('./routes/product'));

// Configure touer so all routes are prefixed with /api
app.use('/api', router);

// Create web server to listen on the specified port
let server = app.listen(port, function () {
	console.log(`NodeAPI server is running on http://localhost:${port}.`);
});
