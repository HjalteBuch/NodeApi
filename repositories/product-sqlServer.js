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

repo.search = function (search, resolve, reject) {
    // 1=1 because I have to have a whereStatement, and 1=1 will always be true
    // Kind of janky, but I like it
    let sql = 'SELECT * FROM Product WHERE 1=1';

    let params = [];

    if (search.name){
        sql += ` AND name LIKE "${search.name}%"`;
        params.push(search.name);
    }
    if (search.listPrice){
        sql += ` AND listPrice >= ${search.listPrice}`;
        params.push(search.listPrice);
    }

    db.submit(sql, [], function (data) {
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
