let db = require('../helpers/sqlserver');

let repo = {
    get: function (resolve, reject) {
        let sql = `
        SELECT productID, name, productNumber, color, standardCost, listPrice, modifiedDate
        FROM Product
        Order BY name, listPrice`;

        db.submit(sql, null, function (data) {
            resolve(data);
        }, function (err) {
            reject(err);
        });
    }
}

module.exports = repo;
