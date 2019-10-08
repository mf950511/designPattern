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

function SubClass(name){
    SuperClass.call(this, name)
}
SubClass.prototype = new SuperClass()
console.log(SubClass.prototype.constructor) // [Function: SuperClass] 指向了父类的构造函数，需要进行偏转
SubClass.prototype.constructor = SubClass
console.log(SubClass.prototype.constructor) // [Function: SubClass] 正常
// 组合式继承，call或apply继承父类属性方法，设置子类原型为父类实例继承父类原型方法，即可实现功能完备的继承
// 缺点：每次生成子类实例都会调用两次父类构造函数，内存耗用过大
let a = new SubClass('张三')
let b = new SubClass('李四')
b.showBooks() // ['js', 'css', 'html']
b.showName()  // 李四
a.books.push('php')
b.showBooks() // ['js', 'css', 'html']
console.log(a instanceof SuperClass)