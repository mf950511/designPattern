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

A.fn.extend({
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

A.extend({
    cameName: function(str){
        return str.replace(/\-(\w)/g, function(all, letter){
            return letter.toUpperCase()
        })
    }
})

A.fn.extend({
    css: function(...args){
        if(args.length < 1) {
            return
        }
        if(args.length === 1) {
            const name = args[0]
            if(typeof args[0] === 'string') {
                if(this[0].currentStyle){
                    return this[0].currentStyle[name]
                } else {
                    return getComputedStyle(this[0], false)[name]
                }
            }else if(typeof args[0] === 'object') {
                for(let i = 0; i < this.length; i++) {
                    for(let key in args[0]) {
                        this[i].style[A.cameName(key)] = args[0][key]
                    }
                }
            }
        } else {
            const name = args[0]
            for(let i = 0; i < this.length; i++) {
                this[i].style[A.cameName(name)] = args[1]
            }
        }
        return this
    }
})

c.css('color', '#f00').css({
    border: '1px solid #fff',
    'border-color': '#f0f'
})

A.fn.extend({
    attr: function(...args){
        if(args.length < 1) {
            return
        }
        if(args.length === 1) {
            if(typeof args[0] === 'string') {
                return this[0].getAttribute(args[0])
            } else {
                for(let i = 0; i < this.length; i++) {
                    for(let key in args[0]) {
                        this[i].setAttribute(key, args[0][key])
                    }
                }
            }
        } else {
            for(let i = 0; i < this.length; i++) {
                this[i].setAttribute(args[0], args[1])
            }
        }
        return this
    }
})

c.attr({
    name: 'asd',
    data: '123'
}).attr('class', 'qwer')

A.fn.extend({
    html: function(...args){
        console.log(args)
        if(args.length) {
            for(let i = 0; i < this.length; i++) {
                this[i].innerHTML = args[0]
            }
            
            return this
        } else {
            return this[0].innerHTML
        }
    }
})

console.log(c.html())
c.html('我是大魔王')

c.css('background-color', '#0f0').html('我是链式调用').attr('data-tag', 'div').on('click', function(){
    alert(this.innerHTML)
})