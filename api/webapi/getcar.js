var express = require('express')
var fs = require('fs')

var router = express.Router()


router.post('/api/getcar', (req,res) => {
  var user = req.body
  if (!user.user_id) {
    return res.json({
      status: 1,
      message: '网络繁忙。。。'
    })
  }

  var user_id = parseInt(user.user_id)

  fs.readFile('./api/data/car.json', 'utf8', (err, data) => {
    if (err) {
      return res.json({
        status: 1,
        message: '网络错误。。。'
      })
    }

    var car = []

    if (JSON.parse(data).some(item => { return item.user_id === user_id })) {
      JSON.parse(data).forEach(item => {
        if (item.user_id === user_id) {
          car = item.car
        }
      })
      res.json({
        status: 0,
        message: car
      })
    } else {
      res.json({
        status: 0,
        message: car
      })
    }
  })

})

module.exports = router
