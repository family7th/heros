//路由，后台工作，前端工作的方式看后台的设置，现在写的就是后台工作
//接收到用户请求后，分配任务（调用handler里面的方法处理业务）

//引入文件
var express = require('express')
var handler = require('./handler-express')

//创建路由模块对象
var router = express.Router()

router.get('/',handler.getIndexPage)  //可以匹配任何url === '/' || url === '/index' && method === 'GET'的请求
      .get('/add',handler.getAddPage)
      .post('/fileUpload',handler.doFileUpload)
      .post('/add',handler.doAdd)
      .get('/edit',handler.getEditPage)
      .post('/edit',handler.doEdit)
      .get('/del',handler.delHeroById)
      .get('/login',handler.getLoginPage)
      .post('/login',handler.doLogin)

      //暴露成员
module.exports = router

// function router(req, res) {
//     var url = req.url
//     var method = req.method //得到的方法是GET,POST,DELETE,PUT  
//     // 加载首页
//     if (url === '/' || url === '/index' && method === 'GET') {
//         handler.getIndexPage(req, res)
//     }
//     //加载静态资源
//         //a.indexOf(b) 返回值是b出现在a的初始位置的索引，等于0时，就是开始
//     if (url.indexOf('/node_modules') == 0 || url.indexOf("/images") == 0) {
//         handler.getStaticSource(req, res);
//     }

//     //展示新增静态页面 
//     if(url==='/add' && method==='GET'){
//         handler.getAddPage(req,res)
//         // res.end("我是add")
//     }

//     //实现文件上传（新增英雄中的图片预览）/uploadpic
//     if(url==='/fileUpload' && method==='POST'){
//         handler.doFileUpload(req,res)
//     }

//     //实现新增操作
//     if(url==='/add' && method==='POST'){
//         handler.doAdd(req,res)
//     }

//     //展示编辑动态页面
//     if(url.indexOf('/edit')===0 && method==='GET'){
//         handler.getEditPage(req,res)
//     }

//     //实现编辑操作
//     if(url==='/edit' && method==='POST'){
//         handler.doEdit(req,res)
//     }

//     //实现删除操作
//     if(url.indexOf('/del')===0 && method==='GET'){
//         console.log(1243)
//         handler.delHeroById(req,res)
//     }

    
// }

//暴露成员
// exports.router = router
// module.exports = router
// module.exports.router = router