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
        for(let i = 0; i < this.imgs.length; i++) {
            if(this.shouldShow(i)){
                console.log(this.imgs[i])
                this.imgs[i].src = this.imgs[i].getAttribute('data-src')
                this.imgs.splice(i,1)
            }
        }
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
    shouldShow: function(i){
        let element = this.imgs[i]
        let clientTop = document.body.scrollTop + document.documentElement.scrollTop // 各浏览器下表现不一致，但只会有一个生效，所以可以直接相加获取
        let clientBottom = clientTop + document.documentElement.clientHeight // documentElement获取窗口高度的值更准确
        let eleTop = this.pageY(element)
        let eleBottom = eleTop + element.clientHeight
        console.log( eleTop, clientBottom, clientTop, (clientBottom > eleBottom && eleBottom > clientTop), (clientBottom > eleTop && eleTop > clientTop))
        if((clientBottom > eleBottom && eleBottom > clientTop) || (clientBottom > eleTop && eleTop > clientTop)) {
            return true
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
