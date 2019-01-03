var express = require('express')
var getdata = require('../config')
var router = express.Router()

var size = 5

router.get('/api/recobook', (req,res) => {
  var page = req.query.page ? req.query.page : 1
  var offset = (page - 1) * size
  getdata(`SELECT Id,Title,Author,ContentDescription,ISBN FROM books LIMIT ${offset},${size}`)
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
