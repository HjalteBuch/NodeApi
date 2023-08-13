// Load the node file system module
const fs = require('fs');

const DATA_FILE = './db/product.json';

// Product repository object
let repo = exports = module.exports = {};

repo.get = function (resolve, reject) {
    // Read from the file
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            reject(err);
        }
        else {
            let products = JSON.parse(data);
            resolve(products);
        }
    });
}

repo.getById = function (id, resolve, reject) {
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            reject(err);
        }
        else {
            let products = JSON.parse(data);
            let product = products.find(row => row.productID == id);
            resolve(product);
        }
    });
}

repo.search = function (search, resolve, reject) {
    if (search) {
        fs.readFile(DATA_FILE, function (err, data) {
            if (err) {
                // ERROR: invoke reject()
                reject(err);
            }
            else {
                // SUCCESS: Convert data to JSON
                let products = JSON.parse(data);
                // Perform the search
                products = products.filter(
                    row => (search.name ? row.name.toLowerCase().indexOf(
                        search.name.toLowerCase())
                        >= 0 : true) &&
                    (search.listPrice ? parseFloat(row.listPrice) > 
                        parseFloat(search.listPrice) : true));
                // Invoke resolve() callback
                // Empty array if no records match
                resolve(products);
            }
        });
    }
}

repo.insert = function (newData, resolve, reject) {
    fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
            reject(err);
        }
        else {
            let products = JSON.parse(data);
            products.push(newData);
            fs.writeFile(DATA_FILE, JSON.stringify(products), function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(newData);
                }
            });
        }
    });
}

repo.update = function (changedData, id, resolve, reject) {
    fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
            reject(err);
        }
        else {
            let products = JSON.parse(data);
            let product = products.find(row => row.productID == id);
            if (product) {
                Object.assign(product, changedData);
                fs.writeFile(DATA_FILE, JSON.stringify(products), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(product);
                    }
                });
            }
        }
    });
}

repo.delete = function (id, resolve, reject) {
    fs.readFile(DATA_FILE, function (err, data) {
        if (err) {
            reject(err);
        }
        else {
            let products = JSON.parse(data);
            let index = products.findIndex(row => row.productID == id);
            if (index != -1) {
                products.splice(index, 1);
                fs.writeFile(DATA_FILE, 
                    JSON.stringify(products), 
                    function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }
                    }
                );
            }
        }
    });
}
