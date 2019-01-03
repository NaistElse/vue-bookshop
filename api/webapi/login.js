var express = require('express')
var getdata = require('../config')

var router = express.Router()

router.post('/api/login', (req,res) => {
  var user = req.body
  if (user.loginId === '' || user.password === '') {
    return res.json({
      status: 1,
      message: '请输入用户名或密码'
    })
  }

  getdata(`SELECT * FROM users where LoginId = '${user.loginId}'`)
  .then( data => {
    if (data.length === 0) {
      return res.json({
        status: 1,
        message: '无此用户或密码错误'
      })
    }
    if(user.password !== data[0].LoginPwd) {
      return res.json({
        status: 1,
        message: '无此用户或密码错误'
      })
    }
    res.json({
      status: 0,
      user: { userid: data[0].Id, username: data[0].LoginId},
      message: '登录成功'
    })
  }, err => {
    res.json({
      status: 1,
      message: '无此用户或密码错误'
    })
  })
})

module.exports = router
