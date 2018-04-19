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

router.get('/', function (req, res, next) {
  // mongoose 定义的Goods模型
  Goods.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
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

module.exports = router;
