function A(selector){
    return A.fn.init(selector)
}
A.fn = A.prototype = {
    init: function(selector){
        this[0] = document.getElementById(selector)
        this.length = 1
        return this
    },
    length: 2,
    size: function(){
        return this.length
    }
}
var a = A('test')
console.log(a)
var b = A('demo')
console.log(b)
console.log(a)