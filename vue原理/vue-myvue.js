(function(global,factory){
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : 
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Vue = factory())
})(this,function(){
    'use strict'
    console.log('vue')
    var emptyObject = Object.freeze({})
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
})