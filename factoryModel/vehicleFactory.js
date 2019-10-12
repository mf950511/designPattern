// 采用寄生式继承实现子类继承抽象父类，这里通过使用new一个新实例来实现继承而不是父类的原型
// 是因为这里我们不仅要继承父类的方法，还要继承父类的属性
let VehicleFactory = function (subType, superType){
    if(typeof VehicleFactory[superType] === 'function') {
        function F(){}
        F.prototype = new VehicleFactory[superType]()
        subType.constructor = subType
        subType.prototype = new F()
    } else {
        throw new Error('未创建该抽象类')
    }
}

VehicleFactory.Car = function(){
    this.name = 'Car'
}
// 属性查找时的原型链查找决定了若子类未重写此方法会执行到这一步
// 作为模拟抽象类抛出异常提示必须重写此方法才可
VehicleFactory.Car.prototype = {
    getPrice: function(){
        throw new Error('不可调用抽象方法')
    },
    getSpeed: function(){
        throw new Error('不可调用抽象方法')
    }
}

VehicleFactory.Bus = function(){
    this.name = 'Bus'
}
VehicleFactory.Bus.prototype = {
    getPrice: function(){
        throw new Error('不可调用抽象方法')
    },
    getSpeed: function(){
        throw new Error('不可调用抽象方法')
    }
}

let YUTONG = function(price, speed){
    this.price = price
    this.speed = speed
}

VehicleFactory(YUTONG, 'Bus')
YUTONG.prototype.getPrice = function(){
    console.log(this.price)
}

YUTONG.prototype.getSpeed = function(){
    console.log(this.speed)
}
// 正常的继承与重写方法
let y = new YUTONG(1000000, 200)
y.getPrice() // 1000000
y.getSpeed() // 200


let BMW = function(price, speed){
    this.price = price
    this.speed = speed
}

VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function(){
    console.log(this.price)
}
// 正常继承未重写方法导致走入抽象类方法报错
let b = new BMW(1000000, 1000)
b.getPrice() // 1000000
b.getSpeed() // Error: 不可调用抽象方法