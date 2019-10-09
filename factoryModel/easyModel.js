function FootBall(){
    this.intro = '足球盛行于北美'
}
FootBall.prototype = {
    getMermber: function(){
        console.log('成员需要11位')
    },
    getBallSize: function(){
        console.log('足球很大')
    }
}

function Basketball(){
    this.intro = '全世界都喜欢篮球'
}
Basketball.prototype = {
    getMermber: function(){
        console.log('篮球只需要5个人')
    },
    getBallSize: function(){
        console.log('篮球更大')
    }
}
// 简单工厂模式，其实就是对同一类别的类进行对外暴露的工厂，使使用者不用关心具体的类是什么样的
// 只需要知道类名即可从工厂中拿走想要的类
// 此模式添加新类需要两步，第一步构造新类，第二步在工厂内添加该类对应的暴露数据
let ballFactory = function(name){
    switch(name) {
        case 'FootBall':
            return new FootBall()
        case 'Basketball':
            return new Basketball()
    }
}

let f = ballFactory('FootBall')
f.getBallSize() // 足球很大
let b = ballFactory('Basketball')
b.getMermber()  // 篮球只需要5个人

