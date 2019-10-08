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

// 原理为使用call或apply在子类内部执行父类的构造函数，只不过将this的指向改为了子类，
// 所以只能继承父类的属性方法，并不能继承父类原型的方法，所以showBooks可正常工作，showName会报错
let a = new SubClass('张胜男')
let b = new SubClass('江玉成')
b.showBooks() // ['js', 'css', 'html']
a.books.push('php')
b.showBooks() // ['js', 'css', 'html']
b.showName()  // TypeError()

