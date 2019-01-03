var express = require('express')

var router = express.Router()

router.get('/api/lunbotu', (req,res) => {
  res.json({
    status: 0,
    message: [
      {
        id: 1,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/29798/34/2107/84792/5c19de3cEbf92f183/385092189df06e71.jpg!q70.dpg'
      },
      {
        id: 2,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/24998/12/2205/89408/5c1b0302Ed0e4c1ec/af728bb82042edf1.jpg!q70.dpg'
      },
      {
        id: 3,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/10267/6/5871/135100/5c1b5952E5d0c3d2f/6ac78a4e7bf567de.jpg!q70.dpg'
      },
      {
        id: 4,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/10603/21/5925/117898/5c1b5381Ea24c36a1/01dc570cec79638c.jpg!q70.dpg'
      },
      {
        id: 5,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/25256/11/3310/58311/5c25ca4dE3963fa28/df1e0a8636587744.jpg!q70.dpg'
      },
      {
        id: 6,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/8040/22/9813/99300/5c1b0414E75c370a6/27e093f7a0bd931e.jpg!q70.dpg'
      },
      {
        id: 7,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/29223/31/2286/78381/5c1b5146Ebc0bc46e/01cf42de7f6aafe9.jpg!q70.dpg'
      },
      {
        id: 8,
        img_url: '//m.360buyimg.com/babel/s1304x521_jfs/t1/26266/6/2278/128512/5c1b4968E506cbe09/b5750d1d797198ef.jpg!q70.dpg'
      }
    ]
  })
})

module.exports = router
