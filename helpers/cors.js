const cors = require('cors');

let corsHelper = {};

corsHelper.configure = function (app) {
    let options = {
        "origin": "http://localhost:3010"
    }

    app.use(cors(options));
}

module.exports = corsHelper;
