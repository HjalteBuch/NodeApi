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

// GET /search route
app.get('/search', (req, res, next) => {
	// Create search object with parameters from query line
	let search = {
		"name": req.query.name,
		"listPrice": req.query.listPrice
	};
	if (search.name || search.listPrice) {
		repo.search(search, function (data) {
			// Success: Data received
			if (data && data.length >0) {
				// Send array of products to caller
				res.send({
					"status": 200,
					"statusText": "OK",
					"message": "Search was successful.",
					"data": data
				});
			}
			else {
				// No products matched the search
				let msg = `The serach for '${JSON.stringify(search)} was not successful.`;
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
		}, function (err) {
			// ERROR: pass error along to the 'next' middleware
			next(err);
		});
	}
	else {
		// No search parameters passed
		let msg = `No search parameters passed in.`;
		res.status(400).send({
			"status": 400,
			"statusText": "Bad Request",
			"message": msg,
			"error": {
				"code": "BAD_REQUEST",
				"message": msg
			}
		});
	}
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
