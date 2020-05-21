(function(global,factory){
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : 
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Vue = factory())
})(this,function(){
    'use strict'
    var emptyObject = Object.freeze({})
    /* 检测数据类型相关start */
    function isUndef(v){
        return v === undefined || v === null
    }
    function isDef(v){
        return v !== undefined && v !== null
    }
    function isTrue(v){
        return v === true
    }
    function isFalse(v){
        return v === false
    }
    function isPrimitive(value){
        // symbol基本数据类型，每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'symbol' ||
            typeof value === 'boolean'
        )
    }
    function isObject(obj){
        return obj !== null && obj === 'object'
    }
    var _toString = Object.prototype.toString;
    function toRowType(value){
        return _toString.call(value).slice(8,-1)
    }
    console.log(Object.prototype.toString.call('str'))//[object String]
    console.log(Object.prototype.toString.call(false))//[object Boolean]
    console.log(Object.prototype.toString.call(4))//[object Number]
    console.log(Object.prototype.toString.call([0]))//[object Array]
    console.log(Object.prototype.toString.call({val:'h'}))//[object Object]
    console.log(Object.prototype.toString.call(function(){}))//[object Function]
    console.log(Object.prototype.toString.call(undefined))//[object Undefined]
    console.log(Object.prototype.toString.call(null))//[object Null]
    console.log(Object.prototype.toString.call(new RegExp()))//[object RegExp]
    function isPlainObject(obj){
        return _toString.call(obj) === '[object Object]'
    }
    function isRegExp(v){
        return _toString.call(v) === '[object RegExp]'
    }
    // 检查val是否是有效的数组索引
    function isValidArrayIndex(val){
        var n = parseFloat(String(val))
        // isFinite() 函数用于检查其参数是否是无穷大,如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false
        // 
        return n >= 0 && Math.floor(n) === n && isFinite(val)
    }
    /* 检测数据类型相关end */

    /* 数据类型转换相关start */
    function toString(val) {
        return val == null ? '' : typeof val === 'object'  ? JSON.stringify(val,null,2) : String(val)
    }
    function toNumber(val) {
        var n = parseFloat(val);
        return isNaN(n) ? val : n
    }

    // 这里用到策略者模式(实现某一个功能有多个途径，此时可以使用一种设计模式来使得系统可以灵活地选择解决途径，也能够方便地增加新的解决途径。)
    function makeMap(str,expectsLowerCase){
        /** Object.create(proto[,propertiesObject]) 用于创建一个新对象,被创建的对象继承另一个对象的原型。如果不是继承一个原有的对象，而是创建一个全新的对象，就要把proto设置为nul
          * proto: 对象，要继承的原型 
          * propertiesObject: 对象，可选参数，为新创建的对象指定属性对象。可包含的值有configurable，enumerable，writable，get,set
        */
        var map = Object.create(null);
        var list = str.split(',');
        for (var i = 0; i < list.length; i++) {
            map[list[i]] = true;
        }
        return expectsLowerCase 
            ? function(val){
            return map[val.toLowerCase()];
        } 
            : function(val){
                return map[val]
            }// 返回一个柯里化函数
    }
    console.log(makeMap('he,l,lo',true)('he'))//true
    console.log(makeMap('he,l,lo',true)('HE'))//true
    console.log(makeMap('he,l,lo',false)('he'))//true
    console.log(makeMap('he,l,lo',false)('HE'))//undefined
    console.log(makeMap('he,l,lo',false)('H'))// undefined
    // 检查标记是否为内置标记。
    var isBuiltInTag = makeMap('slot,component',true)
    // 检查属性是否为保留属性。
    var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

    function remove(arr,item){
        if (arr.length) {
            var index = arr.indexOf(item);
            if (index > -1) {
                return arr.splice(index,1)
            }
        }
    }
    console.log(remove([0,1,2],1))// [1]

    // 返回一个布尔值，指示对象自身属性中是否具有指定的[非继承]属性
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn(obj,key){
        return hasOwnProperty.call(obj,key)
    }
    console.log(Object.prototype.hasOwnProperty.call({val:1},'val'))//true
    console.log(Object.prototype.hasOwnProperty.call([],'slice'))//false




    /* 烧脑start */
    /**
     * cached(function(){}) = function cachedFn(str){
            var hit = cache[str];
            return hit || (cache[str] = fn(str))
        }
     */
    function cached(fn){
        var cache = Object.create(null);
        // console.log('cahe1:',cache)
        return (function cachedFn(str){
            return cache[str] || (cache[str] = fn(str))// hit存在就返回hit，hit不存在就给cache增加键值对
        })
    }
    var camelizeRE = /-(\w)/g;
    /**
     * camelize(str),capitalize(str),hyphenate(str)可读取到cached中的cache和它的传参fn;
        调用一个camelize 存一个键进来 调用两次 如果键一样就返回 hit
        横线-的转换成驼峰写法,可以让这样的的属性 v-model 变成 vModel
     */
    var camelize = cached(function(str){
        return str.replace(camelizeRE,function(_,c){
            return c ? c.toUpperCase : '';
        })
    })
    var capitalize = cached(function(str){
        return str.charAt(0).toUpperCase() + str.slice(1)
    })
    // \B：匹配非单词边界。'erB' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cached(function(str){
        return str.replace(hyphenate,'-$1').toLowerCase();
    })

    console.log(camelize('v-model'))// cache[v-model]存在就返回cache[v-model],不存在就设置cache[v-model]
    console.log(capitalize('v-model'))//v-Model
    console.log(hyphenate('v-model'))
    /* 烧脑end */
})