//引入文件
var express = require('express')
//创建服务器
var app = express()
//添加端口监听
app.lister('3000',()=>console.log('http://127.0.0.1:3000'))
//监听用户请求 ---中间件
app.get('/',(err,data)=>{
    res.end('index')
})