// 类jQuery的$()方法
function A(selector){
    return new A.fn.init(selector) 
}
// 构造一个类jquery对象，返回的对象要有length,size属性
A.fn = A.prototype = {
    constructor: A,
    init: function(selector){
        // ~运算符下-1会被转为0，也就是代表false
        if(~selector.indexOf('#')) {
            let dom = document.getElementById(selector.slice(1))
            this[0] = dom
            this.length = 1
        } else {
            let doms = document.querySelectorAll(selector)
            console.log(123, doms)
            let len = doms.length
            for(let i = 0; i < len; i++){
                this[i] = doms[i]
            }
            this.length = len
        }
        console.log(this === A.fn, this === A.prototype, this)
        return this
    },
    length: 5,
    size: function(){
        console.log(this.length) 
    }
}

A.fn.init.prototype = A.fn

A.extend = A.fn.extend = function(...args){
    let len = args.length
    let target
    if(len === 1) {
        target = this
        let obj = args[0]
        for(let key in obj) {
            this[key] = obj[key]
        }
    } else {
        target = args[0]
        for(let i = 1; i < len; i++) {
            for(let key in args[i]) {
                target[key] = args[i][key]
            }
        }
    }
    return target
    
}

var a = A('#demo')
a.extend({b: 3, d: 4})
console.log(a)
var c = A('.asd')
console.log(c)
c.size()
A.extend(c, { f: 123, g: 234 })
console.log(c)

A.extend(A.fn, {
    on: (function(){
        if(document.addEventListener) {
            return function(type, fn){
                for(let i = 0; i < this.length; i++) {
                    this[i].addEventListener(type, fn, false)
                }
            }
            
        } else if(document.addEvent) {
            return function(type, fn){
                for(let i = 0; i < this.length; i++) {
                    this[i].addEvent('on'+type, fn)
                }
            }
            
        } else {
            return function(type, fn){
                for(let i = 0; i < this.length; i++) {
                    this[i]['on' + type] = fn
                }
            }
        }
    })()
})

c.on('click', function(){
    console.log(this.innerHTML)
})