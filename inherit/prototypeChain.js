function SuperClass(){
    this.books = ['js', 'css', 'html']
}

function SubClass(){

}

SubClass.prototype = new SuperClass()

// 共用一个父类实例作为原型对象，从而达到原型链上存在父类原型对象，弊端就是公用的对象存在引用类型属性时，单个实力的修改会反映到全部实例，且初始化无法传参
let a = new SubClass()
let b = new SubClass()
console.log(b.books) // ['js', 'css', 'html']
a.books.push('php')
console.log(b.books) // ['js', 'css', 'html', 'php']
console.log(a instanceof SuperClass) // true
console.log(b instanceof SuperClass) // true
