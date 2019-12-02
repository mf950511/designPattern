function Dictionary(){
    this.dataStore = []
}

Dictionary.prototype = {
    add: function(key, value){
        this.dataStore[key] = value
    },
    find: function(key){
        return this.dataStore[key]
    },
    remove: function(key){
        delete this.dataStore[key]
    },
    clear: function(){
        Object.keys(this.dataStore).forEach(item => {
            delete this.dataStore[item]
        })
    },
    showAll: function(){
        let keyArr = Object.keys(this.dataStore)
        for(let i = 0, len = keyArr.length; i < len; i++) {
            console.log(`key:${keyArr[i]}, value: ${this.dataStore[keyArr[i]]}`)
        }
    },
    count: function(){
        return Object.keys(this.dataStore).length
    },
    showAllBySort: function(){
        Object.keys(this.dataStore).sort().forEach(item => {
            console.log(`key:${item}, value: ${this.dataStore[item]}`)
        })
    }
}

// Object.keys()的排序规则： 数字永远在字符串之前，数字按大小排列，字符串按创建时间先后排列

let d = new Dictionary()
d.add('a', 'b')
d.add('c', 'd')
d.add('1', '2')
d.add('f', 'e')
d.add('e', 'c')
d.remove('1')
console.log(d.count())
d.showAll()
d.showAllBySort()
console.log(d.find('c'))