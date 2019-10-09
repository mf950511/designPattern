// 安全工厂模式，项目开发中可能会出现对项目不了解的情况，
// 将工厂类当做普通函数执行，从而在window或非window的全局变量上添加更多的变量，为避免该问题设计了安全模式
// 若当前this并未指向当前工厂类说明不是在new的情况下执行的，则需要我们帮他new一个实例返回，若this就是当前工厂类则可以直接返回相应类
function Factory(type, content){
    if(this instanceof Factory) {
        return new this[type](content)
    } else {
        return new Factory(type, content)
    }
}

function appendDiv(color, content){
    let div = document.createElement('div')
    div.style.color = color
    div.innerHTML = content
    document.querySelector('.container').appendChild(div)
}

Factory.prototype = {
    JavaScript: function(content) {
        this.content = content
        appendDiv('red', content)
    },
    Java: function(content){
        this.content = content
        appendDiv('blue', content)
    },
    Php: function(content) {
        this.content = content
        appendDiv('yellow', content)
    }
}
// 安全工厂模式添加类则只需要在工厂内添加相应的类即可，可用于不同类别的类的添加，调用时传入类名即可
let j = Factory('JavaScript', '我是javascript')
let ja = new Factory('Java', 'Java是最强大的后台语言')
let p = new Factory('Php', 'Php是世界上最好的语言')