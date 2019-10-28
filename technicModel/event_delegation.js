
(function(){
    var parent = document.querySelector('ul')
    var lis = parent.getElementsByTagName('li')
    // 当我们需要对列表内的所有li绑定事件时，常规方法是获取所有的li元素，然后对其进行遍历绑定事件，但是这样在元素众多的时候就会执行很多次的绑定，极其耗费内存
    for(let i = 0, len = lis.length; i < len; i++){
        lis[i].addEventListener('click', function(){
            this.style.color = '#0f0'
        }, false)
    }

    // 采用事件委托的形式，我们可以将事件添加给父元素，通过对事件触发对象的判断是否是li元素来决定是否要执行该事件，这样，就只需要触发一次绑定
    parent.addEventListener('click', function(event){
        event = event || window.event
        var tag = event.target || event.srcElement
        if(tag.nodeName.toLowerCase() === 'li') {
            tag.style.background = '#f00'
        }
    }, false)

    // 若是采用循环列表绑定的话，那么如果后续有动态创建dom的话则该dom上就没有该事件了，而采用事件委托形式绑定的事件因为是在父元素绑定的事件，所以，无论什么时候创建的子对象，都可以执行到
    setTimeout(() => {
        let newLis = document.createElement('li')
        newLis.innerHTML = '我是新创建的'
        parent.appendChild(newLis)
    }, 1000)

})()