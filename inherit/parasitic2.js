function inherit(o){
    function F(){}
    F.prototype = o
    return new F()
}

let book = {
    name: 'js',
    alikeBook: ['css', 'html']
}

function createBook(obj){
    // new操作符只是进行了重新赋值，返回值本来就已经是一个实例，此处可要可不要
    let o = new inherit(obj)
    o.getName = function(){
        console.log(this.name)
    }
    return o
}
let b = createBook(book)
b.getName()