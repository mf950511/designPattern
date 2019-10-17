function Mary(){
    this.states = {
        jump: function(){
            console.log('我要跳了')
        },
        run: function(){
            console.log('我要跑了')
        },
        fire: function(){
            console.log('我要攻击了')
        }
    }
    this.currentState = []

}
Mary.prototype = {
    goes: function(){
        this.currentState.forEach(state => {
            this.states[state]()
        })
        return this
    },
    changeState: function(...args){
        this.currentState = args
        return this
    }
}

var m = new Mary()
m
.changeState('run').goes()          // 我要跑了
.changeState('jump', 'fire').goes() // 我要跳了  我要攻击了
