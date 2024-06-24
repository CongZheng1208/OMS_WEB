const http = require('http')

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 打印请求的详细信息
  console.log(`Request method: ${req.method}`)
  console.log(`Request URL: ${req.url}`)
  console.log('Request headers:', req.headers)

  // 设置响应头和响应内容
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Request received and logged.\n')
})

// 监听端口8000
server.listen(5001, () => {
  console.log('Server is listening on http://0.0.0.0:5001')
})
