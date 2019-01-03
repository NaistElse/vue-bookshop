var express = require('express')
var bodyParser = require('body-parser')

var router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use(require('./webapi/lunbotu'))
router.use(require('./webapi/top10'))
router.use(require('./webapi/recobook'))
router.use(require('./webapi/bookdetail'))
router.use(require('./webapi/category'))
router.use(require('./webapi/categorybook'))
router.use(require('./webapi/register'))
router.use(require('./webapi/login'))
router.use(require('./webapi/getcar'))

module.exports = router
