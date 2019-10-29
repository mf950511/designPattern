function throttle(func, wait){
    let timerId
    return function(...args){
        let that = this
        timerId && clearTimeout(timerId)
        timerId = setTimeout(() => {
            func.apply(that, args)
        }, wait)
    }
    
}

document.addEventListener('scroll', throttle(function(){console.log(this)}, 300), false)

function LazyLoad(){
    this.imgs = this.getImgs()
    console.log(this.imgs)
    this.init()
}
LazyLoad.prototype = {
    init: function(){
        this.update()
        this.bindEvent()
    },
    update: function(){
        console.log('寄哪里啊了')
        this.imgs.forEach(item => {
            this.shouldShow(item)
        })
    },
    bindEvent: function(){
        let that = this
        window.addEventListener('resize', throttle(this.update, 400).bind(that), false)
        document.addEventListener('scroll', throttle(this.update, 400).bind(that), false)
    },
    getImgs: function(){
        let imgs = document.getElementsByTagName('img')
        return Array.prototype.slice.call(imgs)
    },
    shouldShow: function(element){
        let clientTop = document.body.scrollTop + document.documentElement.scrollTop // 各浏览器下表现不一致，但只会有一个生效，所以可以直接相加获取
        let clientBottom = clientTop + document.documentElement.clientHeight // documentElement获取窗口高度的值更准确
        let eleTop = this.pageY(element)
        let eleBottom = eleTop + element.clientHeight
        console.log( eleBottom, clientBottom, clientTop, clientBottom > eleBottom > clientTop, clientBottom > eleTop > clientTop)
        if((clientBottom > eleBottom > clientTop) || (clientBottom > eleTop > clientTop)) {
            console.log('我满足条件')
            element.src = element.getAttribute('data-src')
        }
    },
    pageY: function(element){
        if(element.offsetParent) {
            return element.offsetTop + this.pageY(element.offsetParent)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        } else {
            return element.offsetTop
        }
    }
}

window.onload = function(){
    new LazyLoad()
}
