// 继承，其实就是将目标元素的属性克隆到当前元素上，简单的遍历即可（此处仅为浅克隆，深克隆遍历extend可实现）
function extend(target, source) {
    for(let property in source) {
        target[property] = source[property]
    }
    return target
}
// 多元素继承（函数式），遍历之后的目标元素将属性挨个克隆即可
let mix = function(...args){
    let i = 1,
    len = args.length,
    target = args[0],
    arg
    for(;i < len; i++) {
        arg = args[i]
        for(let property in arg){
            target[property] = arg[property]
        }
    }
    return target
}
// 向对象原型添加方法实现多继承
Object.prototype.mix = function(...args){
    let i = 0,
    len = args.length,
    arg
    for(; i < len; i++) {
        arg = args[i]
        for(let property in arg) {
            this[property] = arg[property]
        }
    }
}

let book = {
    name: 'js',
    page: 150,
    sayColorAndSize: function(){
        console.log('书籍颜色大小为：' + this.size + ',' + this.color)
    }
}

let big = {
    size: 'A8'
}
let color = {
    color: 'white'
}

let bigBook = mix(book, big, color)
bigBook.sayColorAndSize() // 书籍颜色大小为：A8,white

let small = {
    size: 'A16'
}
let smallColor = {
    color: 'blue'
}
bigBook.mix(small, smallColor)
bigBook.sayColorAndSize() // 书籍颜色大小为：A16,blue