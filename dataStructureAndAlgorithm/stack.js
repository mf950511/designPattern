function Stack(){
    this.top = 0
    this.dataStore = []
}

Stack.prototype = {
    push: function(data){
        this.dataStore[this.top++] = data
    },
    pop: function(){
        return this.dataStore[--this.top]
    },
    peek: function(){
        return this.dataStore[this.top - 1]
    },
    length: function(){
        return this.top
    }
}

// 栈实现进制转换

function toFixed(number, fix) {
    let stack = new Stack()
    let str = ''
    while(number > 0){
        stack.push(number % fix)
        number = Math.floor(number / fix)
    }
    while(stack.length() > 0) {
        str += stack.pop()
    }
    return str
}



console.log(toFixed(10, 2))