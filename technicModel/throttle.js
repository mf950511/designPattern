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
    this.init()
}
LazyLoad.prototype = {
    init: function(){
        this.update()
        this.bindEvent()
    },
    update: function(){

    },
    bindEvent: function(){},
    getImgs: function(){
        let imgs = document.getElementsByTagName('img')
        return imgs
    },
    shouldShow: function(element){

    },
    pageY: function(element){
        
    }
}
