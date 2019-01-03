var express = require('express')
var getdata = require('../config')
var router = express.Router()

router.get('/api/category', (req,res) => {

  getdata(`SELECT * FROM categories`)
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
