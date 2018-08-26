// 1.反引号
//    可以解析变量
// var name = 'rose'
// console.log(`${name}`) //rose
//    可以创建多行文本
// var name = `rose\njack`
// console.log(name)

// 2.let  const  var
//     var:创建变量，很多时候创建的是全局变量: 
//         没有作用域
//         变量声明会提升
//var name   变量提升
// console.log(name)//undefined 变量提升的结果
// if(true){
//     var name = 'jack'
//   //  name = 'jack'  变量提升
// }
// console.log(name) //jack
    
//     let:创建变量
//         变量有作用域：从创建这个变量开始，到这个变量所在的结构的}结束
//         没有所谓的变量名提升
//console.log(name) 报错
// if(true){
//  console.log(name)
    // let name = 'koo'
    // console.log(name)//koo
// }
//console.log(name) 报错
    
//     const:定义变量
//         一般名称使用大写
//         一旦赋值就不能再更改,如果更改就会报错
// const NAME = 'blue'
// NAME = 'pink'
// console.log(NAME)

// 数组的解构
// var arr = [1]
// var [a,b] = arr 
// console.log(a,b) //[ 1 undefined ]

// 对象解构
// var obj = {
//     name: 'jack',
//     //age: '20',
//     gender: 'true',
//     hobby: ['写代码', '调bug'],
//     computer: {
//         price: 10000,
//         brand: 'dell'
//     }
// }
// var {name,gender} = obj
// console.log(name,gender) //jack true
// var {computer:brand} = obj
// console.log(brand)  //{ price: 10000, brand: 'dell' }
 //:相当于给变量重新赋值 也就是说上面的brand = computer
//  var {computer:{brand}} = obj
//  console.log(brand) //dell
// function fn({ name, gender, age, hobby }) {
//     console.log(name)
//     console.log(gender)
//     if (!age) {
//         age = 100
//     }
//     console.log(age)
// }
// fn(obj)


// var arr = [1,2,3]
// var arr2 = ['a','b','c','d']
// // var arr3 = arr.push(arr2)
// // console.log(arr3);
// var arr4 = [...arr,...arr2]
// console.log(arr4)//[ 1, 2, 3, 'a', 'b', 'c', 'd' ]

var arr = [1,2,3,4]
var arr2 = ['a','b','c','d']
// var arr3 = 5;
// var temp = [...arr,...arr2]
// console.log(temp) //[ 1, 2, 3, 'a', 'b', 'c', 'd' ]
// console.log(arr.push(['a','b','c','d']));
// console.log(typeof arr3);
arr.push(arr2)
console.log(arr)


// arrpush(arr2)
function arrpush(temp){
    
    // 使用展开运算符
    arr.push(temp)  //== arr.push(['a','b','c','d'])
    //[ 1, 2, 3, [ 'a', 'b', 'c', 'd' ] ]
    // arr.push(...temp)   //== arr.push('a','b','c','d')
    // arr.push.apply(arr,temp) //[ 1, 2, 3, 'a', 'b', 'c', 'd' ]
    console.log(arr)
}
