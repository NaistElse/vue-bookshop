var express = require('express')
var getdata = require('../config')

var router = express.Router()

router.get('/api/top10', (req,res) => {
  getdata(`SELECT Id,Title,Author,UnitPrice,ISBN FROM books ORDER BY Clicks desc LIMIT 10`)
    .then( data => {
      res.json({
        status: 0,
        message: data
      })
    }, () => {
      res.json({
        status: 1,
        message: '服务器繁忙。。。'
      })
    })
})

module.exports = router
