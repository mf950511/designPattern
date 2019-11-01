// bind方法实现
function bind(context, fn){
    return function(...args){
        return fn.apply(context, args)
    }
}
let obj = {
    a: 123
}
function c(){
    console.log(this.a)
}
c()
let b = bind(obj, c)
b()
// 函数柯里化
function curry(...args){
    let context = args[0], fn = args[1]
    let allArgs = args.slice(2)
    return function(...args1){
        allArgs = allArgs.concat(args1)
        return fn.apply(context, allArgs)
    }
}
function test(...args){
    console.log(args)
    return args.reduce((total, item) => total + item, 0)
}
var add = curry(null, test, 2,3,4,5)
console.log(add(7, 8, 9, 10))

// 不支持bind方法的浏览器拓展bind方法
if(Function.prototype.bind) {
    Function.prototype.bind = function(context, ...args){
        let that = this
        return function(...args1){
            args = args.concat(args1)
            return that.apply(context, args)
        }
        
    }
}
function a(...args){
    console.log(args)
}
var d = a.bind(null, 1, 2, 3, 4, 5)
d(6,7,8,9,0)