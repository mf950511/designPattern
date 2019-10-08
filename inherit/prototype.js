function inheritObj(o){
    var F = new Function()
    F.prototype = o
    return new F()
}

function SuperClass(){
    this.books = ['js', 'css', 'html']
    this.showBooks = function(){
        console.log(this.books)
    }
}

let s1 = new SuperClass()

// 类似于原型链继承，子类原型为同一对象，存在引用对象即会影响全部实例
let a = inheritObj(s1)
let b = inheritObj(s1)
b.showBooks() // ['js', 'css', 'html']
a.books.push('php')
b.showBooks() // ['js', 'css', 'html', 'php']