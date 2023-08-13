// Create an instance of a Router
const router = require('express').Router();

// Load product repository module
const repo = require('../repositories/product-file');

// GET Route
router.get('/', (req, res, next) => {
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
router.get('/search', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
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

router.post('/', function (req, res, next) {
    repo.insert(req.body, function(data) {
        res.status(201).send({
            "status": 201,
            "statusText": "Created",
            "message": "New Product Added.",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});
module.exports = router;
