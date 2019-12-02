function List(){
    this.dataStore = []
    this.listSize = 0
    this.pos = 0
}
List.prototype = {
    next: function(){
        if(this.pos < this.listSize) {
            this.pos++
        }
    },
    prev: function(){
        if(this.pos >= 0){
            this.pos--
        }
    },
    curPos: function(){
        return this.pos
    },
    hasNext: function(){
        return this.pos < this.listSize
    },
    hasPrev: function(){
        return this.pos >= 0
    },
    front: function(){
        this.pos = 0
    },
    end: function(){
        this.pos = this.listSize - 1
    },
    append: function(ele){
        this.dataStore[this.listSize++] = ele
    },
    remove: function(ele){
        let index = this.dataStore.indexOf(ele)
        if(index > -1) {
            this.dataStore.splice(index, 1)
            this.listSize--
        }
    },
    clear: function(){
        this.dataStore = []
        this.listSize = 0
        this.pos = 0
    },
    toString: function(){
        return this.dataStore
    },
    moveTo: function(pos){
        this.pos = pos
    },
    getElement: function(){
        return this.dataStore[this.pos]
    },
    length: function(){
        return this.listSize
    },
    insert: function(ele, after){
        let index = this.dataStore.indexOf(after)
        if(index > -1) {
            this.dataStore.splice(index + 1, 0, ele)
            this.listSize++
            return true
        }
        return false
    },
    contains: function(ele){
        return this.dataStore.indexOf(ele) > -1
    }
}

let names = new List()
names.append('clayton')
names.append('raymond')
names.append('cynthia')
names.append('jennifer')
names.front()
console.log(names.getElement())
names.end()
console.log(names.getElement())
names.insert('david', 'raymond')
console.log(names.toString())

for(names.front();names.hasNext();names.next()){
    console.log(names.getElement())
}

for(names.end(); names.hasPrev(); names.prev()){
    console.log(names.getElement())
}