var mysql = require('mysql')

var db = mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'bookshop'})

var getdata = function (query, callback) {
  return new Promise(function (resolve, reject) {
    db.query( query ,function (err,data) {
      if (err) {
        reject(err)
      }
      callback && callback(data)
      resolve(data)
  })
 })
}

module.exports = getdata
