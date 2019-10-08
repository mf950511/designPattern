function inherit(o){
    function F(){}
    F.prototype = o
    return new F()
}

function SuperClass(name){
    this.name = name
    this.books = ['js', 'css', 'html']
    this.showBooks = function(){
        console.log(this.books)
    }
}
SuperClass.prototype.showName = function(){
    console.log(this.name)
}
let sup = new SuperClass()
// 就是在原型继承的基础上套了一层函数返回这个对象，可添加一些子类的属性，
// 若公用一个父类实例作为初始化对象则存在子类实例共用引用对象导致数据错乱，无实际意义该方式
function subObj(sup, name){
    let sub = inherit(sup)
    sub.name = name
    return sub
}
let a = subObj(sup, '张三')
let b = subObj(sup, '李四')
b.showBooks()   // [ 'js', 'css', 'html' ]
a.books.push('php')
b.showBooks()   // [ 'js', 'css', 'html', 'php' ]
b.showName()    // 李四

