let user = require('./User')

console.log(`userName: ${user.userName}`)

console.log(`I'm ${user.userName}, I say ${user.sayHello()}`)

let http = require('http')
let url = require('url')
let util = require('util')

let server = http.createServer((req, res) => {
  res.statusCode = 200

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  // url.parse(req.url)     //[Object]

  // 方便开发调试转换为字符串
  // util.inspect(url.parse(req.url))

  // res.end('Hello,Node.js')
  res.end(util.inspect(url.parse(req.url)))
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器已经运行，请打开浏览器输入http://127.0.0.1:3000/来运行')
})
