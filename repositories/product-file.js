// Load the node file system module
const fs = require('fs');

const DATA_FILE = './db/product.json';

// Product repository object
let repo = exports = module.exports = {};

repo.get = function (resolve, reject) {
	// Read from the file
	fs.readFile(DATA_FILE, function (err, data) {
		if (err) {
			reject(err);
		}
		else {
			let products = JSON.parse(data);
			resolve(products);
		}
	});
}
