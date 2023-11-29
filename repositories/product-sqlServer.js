const sqlite3 = require('sqlite3').verbose();

let repo = {};

repo.get = async function (resolve, reject) {
    let db = new sqlite3.Database('/Users/hjalte/Projects/NodeApi/db/AdvWorksProducts.db');
    // let db = new sqlite3.Database('/Users/hjalte/Projects/NodeApi/db/AdvWorksProducts.db', sqlite3.OPEN_READWRITE,(err) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log('Connected to AdvWorksProducts SQlite database.');
    // });

    let sql = `
    SELECT productID, name, productNumber, color, standardCost, listPrice, modifiedDate
    FROM Product
    Order BY name, listPrice`;

    let result = {};
    db.all(sql,[],(err, rows ) => {
        if (err) {
            reject(err);
        }
        result = rows;
        resolve(result);
    });

    // db.all(sql, [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     rows.forEach((row) => {
    //         console.log(row.name);
    //     });
    // });

    db.close()
    // db.close((err) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log('Close the database connection.');
    // });
}

repo.get(
    function(data) {
        console.log(typeof(data));
        console.log(Object.keys(data));
    },
    function(err) {
        console.error(err);
    }
);

module.exports = repo;
