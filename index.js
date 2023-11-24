const express = require('express');
const app = express();
const router = express.Router();

process.env["NODE_ENV"] = "development";
const config = require('config');
const host = config.get('host');
const prefix = config.get('prefix');
const port = config.get('port');

const errorHelper = require('./helpers/error');

router.use('/product', require('./routes/product'));

app.use(express.json());
app.use(prefix, router);

// Configure exception logger to console
app.use(errorHelper.errorToConsole);
// Configure exception logger to file
app.use(errorHelper.errorToFile);
// Configure final exception middleware
app.use(errorHelper.errorFinal);

let server = app.listen(port, function () {
	console.log(`NodeAPI server is running on ${host}:${port}.`);
});
