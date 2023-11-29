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

repo.getById = function (id, resolve, reject) {
    let sql = `
    SELECT *
    FROM Product
    WHERE ProductID = @ProductID`;

    let params = [id];

    db.submit(sql, params, function (data) {
        if (data.length){
            resolve(data);
        } else {
            resolve(undefined);
        }
    }, function (err) {
        reject(err);
    });
}

module.exports = repo;
