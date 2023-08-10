// Load the express module
const express = require('express');
// Load product repository module
const repo = require('./repositories/product-file');
// Create an instance of express
const app = express();
// Specify the port to use for the server
const port = 3000;

// GET Route
app.get('/', (req, res, next) => {
	let products = repo.get(
		function (data) {
			// Code to execute when call is successful
			res.json({
				"status": 200,
				"statusText": "OK",
				"message": "All products retrieved.",
				"data": data
			});
		},
		function (err) {
			// Code to execute when an error occurs
			next(err);
		}
	);
});

// Create web server to listen on the specified port
let server = app.listen(port, function () {
	console.log(`NodeAPI server is running on http://localhost:${port}.`);
});
