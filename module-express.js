//这个模块专门用来处理数据，数据操作一共有四种：增加，删除，修改，查询

//引入文件
var mysql = require('mysql')

//创建链接
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'heros'
})



//为何要用回调函数？因为这个异步请求的责任是读取数据而已，至于读取数据后的操作，这个请求不能自己说了算，需要条用这个请求的人说了算，而这个人不知道这个异步请求什么时候可以完成，就回用回调函数的方式，告诉你，请求数据后该怎么办
exports.getAllData = (callback)=>{
    //创建查询语句
   var sql = 'select id,name,gender,img from heros where isDelete = 0'
   //执行查询命令
   connection.query(sql,(err,res)=>{
       if(err){
           callback(err)
       }else{
          //console.log(res)  res是数组,但我们返回的时候需要返回对象，所以把数组变为对象的属性
          callback(null,{heros:res})
       }
   })
}

//添加用户
exports.addhero = (newObj,callback)=>{
    //创建添加语句
    var sql = `insert into heros values(null,'${newObj.name}','${newObj.gender}','${newObj.img}',default)`
    //执行查询命令
    connection.query(sql,(err,res,fields)=>{
        if(err){
            callback(err)
        }else{
            console.log(fields)
            callback(null,res)
        }
    })
}

//动态展示编辑页面
exports.getHeroById = (id,callback)=>{
   //编辑sql语句
   var sql = `select * from heros where id = ? and isDelete = 0`
   //执行
   connection.query(sql,[id],(err,res,fields)=>{
       if(err){
           callback(err)
       }else{
           //这里获取的是数据，但是调用者需要的是对象，同时我们发现这个sql语句如果执行成功，只可能回有一条记录
           //console.log(res)  看数据说话
           console.log(fields)
           callback(null,res[0])
       }
   })
}

//修改英雄
exports.updateHero = (upObj,callback)=>{
   //编写
   var sql = `update heros set ? where id = ?`
   //执行
   connection.query(sql,[upObj,upObj.id],(err,res,fields)=>{
       if(err){
           callback(err)
       }else{
           console.log(fields)
           callback(null)
       }
   })
}

//删除英雄
//删除一般只是软删除：只是设置一个删除的标记，并不会真正的将数据删除
exports.deleteHeroById = (id,callback)=>{
   var sql = `update heros set isDelete = 1 where id = ?`
   connection.query(sql,[id],(err,res)=>{
       if(err){
           callback(err)
       }else{
           callback(null)
       }
   })
}

//实现登录验证
exports.doLogin = (nickname,callback)=>{
    //编写sql语句
    var sql = 'select * from userinfo where nickname = ?'
    //执行
    connection.query(sql,[nickname],(err,res)=>{
        if(err){
            callback(err)
        }else{
            // console.log(res)
            callback(null,res[0])           
        }
    })

}