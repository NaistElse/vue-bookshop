var express = require('express')
var getdata = require('../config')
var router = express.Router()

router.get('/api/bookdetail', (req,res) => {
  var id = parseInt(req.query.id) || 4939
  getdata(`SELECT books.*, publishers.Name as publishername,categories.Name as categoryname
            FROM books
            INNER JOIN publishers ON books.PublisherId=publishers.Id
            INNER JOIN categories ON books.CategoryId=categories.Id
            WHERE books.Id = ${id} LIMIT 1`)
    .then( data => {
      if (data.length === 0) {
        res.json({
          status: 2,
          message: '无此图书'
        })
      } else {
        res.json({
          status: 0,
          message: data
        })
      }
    }, () => {
      res.json({
        status: 1,
        message: '服务器繁忙。。。'
      })
    })
})

module.exports = router
