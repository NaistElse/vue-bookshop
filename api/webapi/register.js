var express = require('express')
var getdata = require('../config')

var router = express.Router()

router.post('/api/register', (req,res) => {
  var user = req.body
  var id = null
  if(!user.username || !user.password || !user.passwordagain) {
    return res.json({
      status: 1,
      message: '请输入信息'
    })
  }

  if (user.password !== user.passwordagain) {
    return res.json({
      status: 1,
      message: '2次密码输入不同'
    })
  }

  getdata(`SELECT Id FROM users ORDER BY Id DESC LIMIT 1`)
  .then( data => {
    id = parseInt(data[0].Id) + 1
    return getdata(`INSERT users(Id,LoginId,LoginPwd,UserRoleId,UserStateId) VALUES(${id},'${user.username}','${user.password}',1,1)`)
  }, err => {
    res.json({
      status: 2,
      message: '网络繁忙。。。'
    })
  })
  .then( data => {
    res.json({
        status: 0,
        message: '注册成功'
      })
  }, err => {
    res.json({
      status: 1,
      message: '已有用户名'
    })
  })
})

module.exports = router
