const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());

process.env["NODE_ENV"] = "development";
const config = require('config');
const host = config.get('host');
const prefix = config.get('prefix');
const port = config.get('port');

router.use('/product', require('./routes/product'));

app.use(prefix, router);

// Force Express to send error 500 request back to caller if error occurs instead of html as default
app.use(function (err, req ,res ,next) {
    res.status(500).send(err);
});

let server = app.listen(port, function () {
	console.log(`NodeAPI server is running on ${host}:${port}.`);
});
