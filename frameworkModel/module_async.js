(function(F){
    let moduleCache = {}
    F.module = function(...args){
        console.log(args)
        let callback = args.pop()
        console.log(args.length, args.length && args[args.length - 1])
        let deps = args.length && args[args.length - 1] instanceof Array && args.pop() || []
        let url = args.length ? args.pop() : null
        console.log(deps, url, 345)
        let params = []
        let len = i = 0
        let depsCount = 0
        if(len = deps.length) {
             while(i < len) {
                 (function(i){
                   depsCount++
                   loadModule(deps[i], function(dep){
                        depsCount--
                        params[i] = dep
                        if(depsCount === 0) {
                            setModule(url, params, callback)
                        }
                   }) 
                 })(i)
                 i++
             }
        } else {
            setModule(url, [], callback)
        }
    }
    function loadModule(moduleName, callback){
        if(moduleCache[moduleName]){
            let module = moduleCache[moduleName]
            if(module.status === 'loaded') {
                setTimeout(callback(module.exports), 0)
            } else {
                module.onload.push(callback)
            }
        } else {
            moduleCache[moduleName] = {
                moduleName: moduleName,
                status: 'loading',
                exports: null,
                onload: [callback]
            }
            loadScript(getUrl(moduleName))
        }
    }
    function setModule(moduleName, params, callback){
        let _module, fn
        if(moduleCache[moduleName]) {
            _module = moduleCache[moduleName]
            _module.status = 'loaded'
            _module.exports = callback ? callback.apply(_module, params) : null
            while(fn = _module.onload.shift()) {
                fn(_module.exports)
            }
        } else {
            callback && callback.apply(null, params)
        }
    }

    function getUrl(url) {
        return String(url).replace(/\.js$/g, '') + '.js'
    }

    function loadScript(url){
        let script = document.createElement('script')
        script.src = url
        script.type = 'text/JavaScript'
        script.async = true
        script.charset = 'utf-8'
        document.getElementsByTagName('head')[0].appendChild(script)
    }

})(function(){
    return window.F = {}
}())