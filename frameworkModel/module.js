(function(F){
    F.define = function(str, fn){
        let parts = str.split('.'), old = parent = this, i=0
        if(parts[0] === 'F') {
            parts = parts.slice(1)
        }
        if(parts[0] === 'module' || parts[0] === 'define') {
            return
        }
        for(let len = parts.length; i < len; i++) {
            if(typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {}
            }
            old = parent
            parent = parent[parent[i]]
        }
        if(fn) {
            old[parts[--i]] = fn()
        }
        return this
    }

    F.module = function(...args){
        let fn = args[args.length - 1]
        let parts, module_temp = [],parent = this
        if(args[0] instanceof Array) {
            parts = args[0]
        }else {
            parts = args
        }
        for(let i = 0, len = parts.length; i < len; i++) {
            if(typeof parts[i] === 'string') {
                let partsArr = parts[i].replace(/^F\./g, '').split('.')
                for(let j = 0, len1 = partsArr.length; j < len1; j++) {
                    parent = parent[partsArr[j]] || null
                }
                module_temp.push(parent)
            } else {
                module_temp.push(parts[i])
            }
        }
        fn.call(null, module_temp)
    }
})(function(){
    return window.F = {}
}())

F.define('string', function(){
    return {
        trim: function(str){
            return str.trim()
        }
    }
})

F.define('dom', function(){
    var $ = function(id){
        $.dom = document.getElementById(id)
        return this
    }
    $.html = function(html){
        if(html) {
            this.dom.innerHTML = html
            return this
        } else {0
            return this.dom.innerHTML
        }
    }

    return $

})
F.module('dom', document.getElementById('container'), function([dom, ele]){
    // dom('container').html('123123')
    console.log(dom)
    dom('container').html('123')
})