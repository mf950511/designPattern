function inherit(o){
    function F(){}
    F.prototype = o
    return new F()
}
// 对象查找属性会沿着原型链网上找，即prototype,一层一层往上走
function inheritPrototype(SubClass, SuperClass){
    // 这里先以构造了一个原型对象为父类原型的对象将其作为子类的原型对象，即子类原型对象的原型对象为父类原型
    // sup的prototype为SuperClass.prototype,SubClass的prototype为sup,即SubClass的prototype.prototype为SuperClass.prototype
    let sup = inherit(SuperClass.prototype)
    sup.constructor = SubClass
    SubClass.prototype = sup
    console.log(SubClass.prototype)
}

function SubClass(name){
    SuperClass.call(this, name)
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


inheritPrototype(SubClass, SuperClass)

let a = new SubClass('张飒')
let b = new SubClass('李式')
b.showBooks() // ['js', 'css', 'html']
a.books.push('php')
b.showBooks() // ['js', 'css', 'html']
b.showName()  // 李式