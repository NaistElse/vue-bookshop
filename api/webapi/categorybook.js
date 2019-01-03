var express = require('express')
var getdata = require('../config')
var router = express.Router()

var size = 10

router.get('/api/categorybook', (req,res) => {
  var categoryid = parseInt(req.query.categoryid) ? parseInt(req.query.categoryid) : 1
  var page = parseInt(req.query.page) ?  parseInt(req.query.page) : 1
  var offset = (page - 1) * size

  getdata(`SELECT Id,Title,Author,ISBN FROM books WHERE CategoryId = ${categoryid} LIMIT ${offset},${size}`)
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
