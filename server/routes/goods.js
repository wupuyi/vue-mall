var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

// 链接mongoDB数据库
mongoose.connect('mongodb://root:666666@127.0.0.1:27017/dumall')

// 检查是否链接
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

// 链接错误
mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

// 断开链接
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB disconnected success')
})

// 查询商品列表数据
router.get('/', function (req, res, next) {
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  // 价格区间分类标志
  let priceLevel = req.param('priceLevel')
  // 大于区间
  let priceGt = ''
  // 小于等于区间
  let priceLte = ''
  // 实现排序,sort=1为升序
  let sort = req.param('sort')
  let skip = (page - 1) * pageSize
  let params = {}
  // 根据priceLevel判断 价格区间
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0
        priceLte = 100
        break
      case '1':
        priceGt = 100
        priceLte = 500
        break
      case '2':
        priceGt = 500
        priceLte = 1000
        break
      case '3':
        priceGt = 1000
        priceLte = 5000
        break
      default: break
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  // .skip()跳过几条
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({'salePrice': sort})
  // mongoose 定义的Goods模型
  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 加入到购物车
router.post('/addCart', function (req, res, next) {
  var userId = '100000077'
  var productId = req.body.productId
  var User = require('../models/user')

  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      console.log('userDoc:' + userDoc)
      if (userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) {
          if (item.productId === productId) {
            goodsItem = item
            item.productNum++
          }
        })
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, function (err1, doc) {
            if (err1) {
              res.json({
                status: '1',
                msg: err1.message
              })
            } else {
              if (doc) {
                doc.checked = 1
                doc.productNum = 1
                userDoc.cartList.push(doc)
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

module.exports = router;
