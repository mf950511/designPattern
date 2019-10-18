function Iterator(item, container){
    var wrap = container && document.getElementById(container) || document
    var items = wrap.getElementsByTagName(item)
    var length = items.length
    var index = 0
    return {
        first: function(){
            index = 0
            return items[index]
        },
        last: function(){
            index = length - 1
            return items[index]
        },
        pre: function(){
            if(--index >= 0) {
                return items[index]
            } else {
                index = 0
                return null
            }
        },
        next: function(){
            if(++index <= length) {
                return items[index]
            } else {
                index = length - 1
                return null
            }
        },
        get: function(index){
            let num = index >= 0 ? index % length : index % length + length
            return items[num]
        },
        dealEach: function(fn){
            Array.prototype.slice.call(items).forEach(item => {
                fn.call(item)
            })
        },
        dealItem: function(index, fn){
            fn.call(items[index])
        },
        exclusive: function(num, allFn, itemFn){
            this.dealEach(allFn)
            console.log(Object.prototype.toString.call(num))
            if(Object.prototype.toString.call(num) === '[object Array]') {
                console.log(123, this)
                num.forEach((item, index) => {
                    this.dealItem(item, itemFn)
                })
            } else {
                this.dealItem(num, itemFn)
            }
        }
    }
}

var it = Iterator('li', 'container')
console.log(it.first())
console.log(it.next())
console.log(it.pre())
console.log(it.last())
it.dealEach(function(){
    this.style.background = 'red'
})
it.dealItem([2], function(){
    this.innerHTML = 'dealItem'
})
it.exclusive([1,3], function(){
    this.innerHTML = 'exclusive'
}, function(){
    console.log(234, this)
    this.innerHTML = 'each'
})