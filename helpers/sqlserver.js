let sqlite = require('sqlite3');

const config = require('config');

let connectString = config.get('connectString');

let db = {};

db.submit = async function (sql, params, resolve, reject) {
    try {
        let db = new sqlite.Database('/Users/hjalte/Projects/NodeApi/db/AdvWorksProducts.db');

        db.all(sql, params, (err, rows ) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

        db.close();
    } catch (err) {
        reject(err);
    }
}

module.exports = db
