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

// GET /id Route
app.get('/:id', (req, res, next) => {
	repo.getById(req.params.id, function (data) {
		if (data) {
			// Code to execute when call is successful
			res.send({
				"status": 200,
				"statusText": "OK",
				"message": "Single product retrieved.",
				"data": data
			});
		}
		else {
			let msg = `The product '${req.params.id}' could not be found.`;
			res.status(404).send({
				"status": 404,
				"statusText": "Not Found",
				"message": msg,
				"error": {
					"code": "NOT_FOUND",
					"message": msg
				}
			});
		}
	}, function(err) {
		next(err);
	});
});

// Create web server to listen on the specified port
let server = app.listen(port, function () {
	console.log(`NodeAPI server is running on http://localhost:${port}.`);
});
