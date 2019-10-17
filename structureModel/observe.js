// 发布订阅模式：以闭包的形式对外提供操作事件管理对象的方法，从而实现模块与模块间的通信
var Observer = (function(){
    var evt = {}
    return {
        // 事件订阅
        on: function(type, fn){
            if(typeof fn !== 'function'){
                throw new Error('缺少回调函数')
            }
            if(evt[type]) {
                evt[type].push(fn)
            } else {
                evt[type] = [fn]
            }
        },
        // 取消订阅
        off: function(type){
            evt[type] = null
        },
        // 触发事件
        emit: function(type, ...args){
            if(evt[type]) {
                evt[type].forEach(fn => {
                    fn.apply(null, args)
                })
            }
        }
    }
})()