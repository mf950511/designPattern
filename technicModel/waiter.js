function Waiter(){
    let deps = [], failArr = [], doneArr = [], that = this
    function Primise(){
        this.rejected = false
        this.resolved = false
    }
    Primise.prototype = {
        resolve: function(){
            this.resolved = true
            for(let len = deps.length - 1; len >= 0; len--) {
                if(deps[len] && !deps[len].resolved || deps[len].rejected) {
                    return 
                }
                deps.splice(len, 1)
            }
            that._exec(doneArr)
        },
        reject: function(){
            this.rejected = true
            deps = []
            that._exec(failArr)
        }
    }

    that.Deferred = function(){
        return new Primise()
    }

    that.when = function(deferredArr = []){
        deps = deferredArr
        for(let i = 0, len = deps.length; i < len; i++){
            if(!deps[i] || deps[i].resolved || deps[i].rejected || !(deps[i] instanceof Primise)) {
                deps.splice(i, 1)
            }
        }
        return that
    }

    that._exec = function(arr = []){
        for(let i = arr.length - 1; i >= 0; i--) {
            arr[i] && arr[i]()
        }
    }
    
    that.done = function(...args){
        doneArr = doneArr.concat(args)
        return that
    }

    this.fail = function(...args){
        failArr = failArr.concat(args)
        return that
    }
    
}

let waiter = new Waiter()
let deferred1 = waiter.Deferred()
setTimeout(() => {
    console.log('1s后执行')
    deferred1.resolve()
}, 1000)

function second(){
    let dtd = waiter.Deferred()
    setTimeout(() => {
        console.log('4s后执行')
        dtd.resolve()
    }, 4000)
    return dtd
}


waiter.when([deferred1, second()]).done(function(){
    console.log('success')
}, function(){
    console.log('success again')
}).fail(function(){
    console.log('fail')
})