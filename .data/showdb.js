// showdb.js
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
var db;

// raw function

function run(sql, params) {
	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

function run2(sql, param0, param1) {
	return new Promise((resolve, reject) => {
		db.run(sql, param0, param1, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

function get(sql, params) {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) reject(err);
			resolve(row);
		});
	});
}

function all(sql, params) {
	return new Promise((resolve, reject) => {
    if (params != null) {
      db.all(sql, params, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });  
    } else {
      db.all(sql, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });  
    }
	});
}

function each(sql, func) {
	return new Promise((resolve, reject) => {
		db.each(sql,
      (err, row) => {
        func(err, row);
      }, (err) => {
			  if (err) reject(err);
			  resolve();
		});
	});
}

async function main()
{
  const name = 'train_data.db'
  var exists = fs.existsSync(name);
  db = new sqlite3.Database(name);

  var row = await all("SELECT * from Rules");
  if (row) {
    console.log(row);
  }
}

main();
