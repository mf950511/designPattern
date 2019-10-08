function New(f){
    return function(...args){
        // 实现new的三步
        // 1.初始化新对象
        // 2.将构造函数的属性赋值到新对象身上
        // 3.将新对象的原型对象指向构造函数的原型来获得构造函数的原型方法
        let o = {}
        f.apply(o, args)
        o.__proto__ = f.prototype
        return o
    }
}

function SuperClass(name, age){
    this.name = name
    this.age = age
}

SuperClass.prototype.showName = function(){
    console.log(this.name)
}

let b = New(SuperClass)('张三', 123)
console.log(b.name)
console.log(b.age)
b.showName()

