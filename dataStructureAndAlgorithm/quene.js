function Quene(){
    this.dataStore = []
}

Quene.prototype = {
    enquene: function(data){
        this.dataStore.push(data)
    },
    dequene: function(hasCode){
        if(hasCode) {
            let entry = 0
            for(let i = 0, len = this.dataStore.length; i < len; i++) {
                if(this.dataStore[i].code > this.dataStore[entry].code ) {
                    entry = i
                }
            }
            return this.dataStore.splice(entry, 1)
        }
        return this.dataStore.shift()
    },
    isEmpty: function(){
        return !this.dataStore.length ? true : false
    },
    front: function(){
        return this.dataStore[0]
    },
    back: function(){
        return this.dataStore[this.dataStore.length - 1]
    },
    toString: function(){
        let str = ''
        for(let i = 0, len = this.dataStore.length; i < len; i++) {
            str += '下一个是' + this.dataStore[i] + '\n'
        }
        return str
    }
}

let dancer = `
F A
M B
F C
M D
M E
M F
`
function Dancer(name, sex){
    this.name = name
    this.sex = sex
}

// 男女跳舞组合处理

let M = new Quene()
let F = new Quene()

function initDancer(){
    let dancerList = dancer.split('\n').filter(item => {
        if(item.trim()) {
            return item.trim()
        }
    })
    dancerList.map(item => {
        let name = item.split(' ')[1], sex = item.split(' ')[0]
        if(sex === 'F') {
            F.enquene(new Dancer(name, sex))
        } else if(sex === 'M') {
            M.enquene(new Dancer(name, sex))
        }
    })
}
initDancer()

function dance(){
    console.log('the dance partners are: \n')
    while(!M.isEmpty() && !F.isEmpty()) {
        console.log(`男方为：${ M.dequene().name }，女方为：${ F.dequene().name }`)
    }
    if(!M.isEmpty()) {
        console.log(`男方等待位:${ M.dequene().name }`)
    }
    if(!F.isEmpty()) {
        console.log(`女方等待位:${ F.dequene().name }`)
    }
}

dance()

function Patient(name, code){
    this.name = name
    this.code = code
}

let p = new Quene()

let pArr = ['A,1', 'B,1', 'C,0', 'D,2', 'E,1']
pArr.map(item => {
    let pItem = item.split(',')
    p.enquene(new Patient(pItem[0], pItem[1]))
})

while(!p.isEmpty()){
    console.log(p.dequene(true))
}

