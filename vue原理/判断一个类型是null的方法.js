// var u, s = 'string', b = false , nb = 0, sy = Symbol();
// var  n = null, a = [], o = {}, f = () => {}, r = /^string$/;

// // 判断简单数据类型
// console.log(typeof u);// undefined
// console.log(typeof s);// string
// console.log(typeof b);// boolean
// console.log(typeof nb);// number
// console.log(typeof sy);// symbol

// console.log(Object.prototype.toString.call(undefined))// [object Undefined]
// console.log(Object.prototype.toString.call('str'))// [object String]
// console.log(Object.prototype.toString.call(false))// [object Boolean]
// console.log(Object.prototype.toString.call(4))// [object Number]
// console.log(Object.prototype.toString.call(sy))// [object Symbol]

// // 判断是NaN
// console.log(isNaN(NaN));// true
// console.log(Object.is(NaN,NaN));// true

// // 判断是null的方法
// console.log(!n && typeof n === 'object');// true
// console.log(n === null);// true
// console.log(Object.is(n,null));// true
// console.log(Object.prototype.toString.call(null))//[object Null]


// // 判断是数组
// console.log(Array.isArray(a));
// console.log(Object.prototype.toString.call([0]))//[object Array]
// console.log(Object.is(a,Array));

// // 判断严格对象
// console.log(Object.prototype.toString.call({val:'h'}))//[object Object]

// // 判断是Funcion
// console.log(Object.prototype.toString.call(function(){}))//[object Function]

// // 判断正则
// console.log(Object.prototype.toString.call(new RegExp()))//[object RegExp]


// // 附加题：
// console.log(Object.is([],[]))// false

// function fn(a,b,c){// 伪数组转化为真数组
// 	var arr1 = Array.from(arguments);
// 	var arr2 = Array.prototype.slice.call(arguments);
// 	console.log(arguments);// [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
// 	console.log(arr1)
// 	console.log(arr2)
// }
// fn(1,2,3,4)

// // 一行代码实现深拷贝(只对对象有用)
// var obj = {a:1,b:2,c:3}
// var copyObj = JSON.parse(JSON.stringify(obj));
// obj.a = 5;
// console.log(obj,copyObj)

console.log(0.1 + 0.2 === 0.3);
console.log((0.1+ 0.2) * 10 === 0.3 * 10);