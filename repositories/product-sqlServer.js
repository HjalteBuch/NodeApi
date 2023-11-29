let db = require('../helpers/sqlserver');

let repo = {
    get: function (resolve, reject) {
        let sql = `
        SELECT *
        FROM Product
        Order BY name, listPrice;`;

        db.submit(sql, [], function (data) {
            resolve(data);
        }, function (err) {
            reject(err);
        });
    }
}

module.exports = repo;
