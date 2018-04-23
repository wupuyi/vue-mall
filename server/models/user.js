var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [
    {
      'productId': String,
      'productName': String,
      'salePrice': String,
      'productImage': String,
      'checked': String,
      'productNum': String
    }
  ],
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'postCode': Number,
      'tel': Number,
      'isDefault': Boolean
    }
  ]
})

module.exports = mongoose.model('User', userSchema)
// 第三个参数是数据库名字，如果不写默认为user+s
// module.exports = mongoose.model('User', userSchema, 'users')
