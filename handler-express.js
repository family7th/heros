//处理业务的代码
var fs = require('fs')
var template = require('art-template')
var formidable = require('formidable')
var path = require('path')
var querystring = require('querystring')
var myurl = require('url')
//引入dataModule.js自定义模块
var mymodule = require('./module-express')



//获取数据，动态渲染页面
exports.getIndexPage = (req, res) => {
    mymodule.getAllData((err, data) => {
        if (err) {
            res.end('404')
        } else {
            res.render(__dirname + '/view/index.html', data)
        }
    })
}

//动态请求获取静态资源
exports.getStaticSource = (req, res) => {
    var url = req.url
    fs.readFile(__dirname + url, (err, data) => {
        if (err) {
            res.end('404')
        } else {
            res.end(data)
        }
    })
}

//展示新增静态页面 
exports.getAddPage = (req, res) => {
    //render:它的作用就是能够实现模板引擎的渲染，并且将渲染结果自动返回
    //渲染一般都需要两个前提：一个是模板内容（路径），一个是数据
    //这个方法使用到了模板引擎，它需要再引入一个新的模板引擎模块，名字叫express-art-template
    //我们现在使用的是express-art-template , 需要强调的是，这不是一个位移的选择，只是让我们了解到，这个render必须有模板引擎的参与
    //所以它需要引入两个模板引擎：art-template  express-art-template 
    res.render(__dirname + '/view/add.html')
}

//实现文件上传的操作 req.url==='fileUpload',method==='post
exports.doFileUpload = (req, res) => {
    // console.log(req.body)
    //1.创建对象
    var form = new formidable.IncomingForm()
    //2.设置编码：入股有普通键值对数据就最好设置
    form.encoding = 'utf-8'
    //3.设置上传文件的存储目录 （请注意：一定要记得加当前根目录，否则会报错）
    form.uploadDir = __dirname + '/public/images'
    //4.设置是否保留文件的拓展名
    form.keepExtensions = true
    //5.上传文件会执行parse函数
    //req:因为req是请求报文，而传递的数据都存储在请求报文中
    //上传完毕后触发调用回调函数，这里面有三个参数
    //err:上传如果失败的错误信息
    //fields:数据传递成功普通的键值对存储对象
    //files:文件上传成功，存储着文件信息
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.json({
                code: 100,
                msg: '上传失败'
            })
        } else {
            //   console.log(fields)
            //   console.log('--------------------------')
            //   console.log(files.img.path)
            //'d:\\广州黑马前端与移动开发就业20期（20180521面授）\\node.js\\day3\\04-上课案例\\code2\\images\\upload_c14b3a6db12cac323bd7e749e70c1316.jpg'
            //basename:可以获取当前路径中的最后一个部分
            var filename = path.basename(files.img.path)
            res.json({
                code: 200,
                msg: '上传成功',
                myimg: filename
            })
        }
    })
}

//实现新增操作
exports.doAdd = (req, res) => {
    // console.log(req.body)  req.body获取到的是前端传过来的数据，而且是对象型数据，可以直接拿来用
    mymodule.addhero(req.body, (err) => {
        if (err) {
            //res.json()的作用就是将对象转换成json字符串并返回
            res.json({
                code: 100,
                msg: '添加失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '添加成功'
            })
        }
    })
}

//展示编辑动态页面(为什么是动态的？因为根据用户点击的来进行编辑)
exports.getEditPage = (req, res) => {

    //获取用户传递过来的id号
    var url = req.url
    //具体查看url.parse()用法
    var id = myurl.parse(url, true).query.id
    // console.log(id)
    //得到id号，调用dataModule方法
    mymodule.getHeroById(id, (err, data) => {
        if (err) {
            res.end('404')
        } else {
            // var html = template(__dirname+'/view/edit.html',data)
            // res.end(html)
            res.render(__dirname + '/view/edit.html', data)
        }
    })
}

//实现编辑功能
exports.doEdit = (req, res) => {
    mymodule.updateHero(req.body, (err) => {
        if (err) {
            res.json({
                code: 100,
                msg: '删除失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
}

//实现删除功能
exports.delHeroById = (req, res) => {
    // console.log(req.body)
    //获取id号，调用方法
    // console.log(123)
    var id = myurl.parse(req.url, true).query.id
    // console.log(id)
    mymodule.deleteHeroById(id, (err) => {
        if (err) {
            res.json({
                code: 100,
                msg: '删除失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功'
            })
            //跳转回首页
            //res.end('<script>location.href="/</script>') 第一种方法
            //第二种方法:通过响应头来实现重定向
            // res.writeHead(301,{
            //     'Location':'/'
            // })
            // res.end()  同步操作

            // res.redirect('/') 重定向另外一种方法
        }
    })
}

//展示登录页面
exports.getLoginPage = (req, res) => {
    res.render(__dirname + '/view/login.html')
}

//doLogin登录请求
exports.doLogin = (req, res) => {
    // console.log(req.body) { username: 'rose', userpwd: '456465' }
    var current = req.body
    mymodule.doLogin(current.username, (err, data) => {
        if (err) {
            res.json({
                code: 100,
                msg: '服务器异常'
            })
        } else {
           if(data){//分两种情况，一种是res有数据，一种是没数据，没数据是因为执行语句没错误，但是没有对应值
                //返回的结果有数据
            if (data.password === current.userpwd) {
                //  console.log(req.session); session是一个对象
                //    Session {                 
                // cookie: { path: '/',
                // _expires: null,
                // originalMaxAge: null,
                // httpOnly: true } }
                //  console.log(req.body)=>{ username: 'jack', userpwd: '123' } 
                //将登录状态保持到session（设置sesseion信息）
                req.session.isLogin = 'true'
                req.session.current = req.body
                res.writeHead(301, {
                    'Location': '/'
                })
                res.end()
            } else {  //密码错误
                res.writeHead(301, {
                    'Location': '/login'
                })
                res.end()
            }
           }else{
               //这个是返回的res没有数据，  用户名不存在
            res.writeHead(301, {
                'Location': '/login'
            })
            res.end()
           }
        }
    })

}