//主要责任是创建服务器，接收用户请求,调用router
//引入文件
var express = require('express')

//引入session
var session = require('express-session')

var router = require('./router-express')

//创建服务器
var app = express()

//添加监听对象
app.listen('5000',()=>{console.log('http://127.0.0.1:5000')})

//引入body-parser:它的作用是通过以中间件的方式设置参数的解析和传递方式
var bodyParser = require('body-parser')
//进行参数传递时的配置
var bodyurl = bodyParser.urlencoded({extended:false})
app.use(bodyurl)
app.use(bodyParser.json())


//添加session注入
app.use(session({
    secret:'secret',//加密的字符串，对session id相关的cookie进行签名---加盐
    resave:false, //不管session数据是否发生改变，都会自动保存
    saveUninitialized:false  //是否保存未初始化的会话 
}))


//下面这个中间件就是用来告诉当前应用要使用express-art-complate来进行模板的渲染
//art:就是指能够用于解析的文件的拓展名，我们可以修改为html
app.engine('html', require('express-art-template'));
//下面这个配置是指指定在上面环境下使用这个渲染方式
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});


//托管静态资源
app.use(express.static('public'))

//没有挂载路径和中间件，应用的每个请求都会执行该中间件
app.use(function(req,res,next){
                                        //如果没有req.url==='/login'会出现死循环
    if(req.session.isLogin && req.session.isLogin ==='true' || req.url==='/login'){
        next()   //该干嘛就干嘛
    }else{
        //如果没有就重定向
        res.writeHeader(301,{
            'Location':'/login'
        })
        res.end()
    }
})

//让当前应用使用我们指定的路由规则
//挂载--use
//注入路由
app.use(router)




