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

    if (search.name){
        sql += ` AND name LIKE "${search.name}%"`;
    }
    if (search.listPrice){
        sql += ` AND listPrice >= ${search.listPrice}`;
    }

    db.submit(sql, [], function (data) {
        resolve(data);
    }, function (err) {
        reject(err);
    });
}

repo.insert = function(products, resolve, reject) {
    let sql = 'INSERT INTO Product (Name, ProductNumber, Color, StandardCost, ListPrice, ModifiedDate) VALUES ';

    let date = new Date();
    date = date.toISOString();
    for (const p of products) {
        let color = null;
        if (p.color) {color = `"${p.color}"`};
        sql += `("${p.name}", "${p.productNumber}", ${color}, ${p.standardCost}, ${p.listPrice}, "${date}"), `;
    }
    sql = sql.slice(0, -2);

    db.submit(sql, [], function (data) {
        resolve(products);
    }, function (err) {
        reject(err);
    });
}

repo.update = function(changeData, id, resolve, reject) {
    let keys = Object.keys(changeData);

    sql = `UPDATE Product SET `;
    for (const key of keys) {
        if (key != "standardCost" || key != "listPrice") { 
            sql += `${key} = "${changeData[key]}", `;
        } else {
            sql += `${key} = ${changeData[key]}, `;
        }
    }
    sql = sql.slice(0, -2);
    sql += ` WHERE ProductID = ${id};`;

    db.submit(sql, [], function (empty) {
        repo.getById(id, function(data) {
            resolve(data);
        }, function(getErr){
            resolve(empty);
        });
    }, function (err) {
        reject(err);
    });
}

module.exports = repo;
