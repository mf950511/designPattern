function Hash(){
  this.tableLength = 137
  this.table = new Array(this.tableLength)
}

Hash.prototype = {
  put: function(value){
    let pos = this.simpleHash(value)
    this.table[pos] = value
  },
  simpleHash: function(data){
    let total = 0
    for(let i = 0; i < data.length; i++) {
      total += data.charCodeAt(i)
    }
    console.log(`初始key: ${data}, 初始值: ${total}`)
    return total % this.tableLength
  },
  showDistro: function(){
    for(let i = 0; i < this.tableLength; i++) {
      if(this.table[i] !== undefined) {
        console.log(`key: ${i}, value: ${this.table[i]}`)
      }
    }
  }
}

let someName = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan']
let has = new Hash()
someName.map(item => {
  has.put(item)
})
has.showDistro()
// 初始key: David, 初始值: 488
// 初始key: Jennifer, 初始值: 817
// 初始key: Donnie, 初始值: 605
// 初始key: Raymond, 初始值: 730
// 初始key: Cynthia, 初始值: 720
// 初始key: Mike, 初始值: 390
// 初始key: Clayton, 初始值: 730
// 初始key: Danny, 初始值: 506
// 初始key: Jonathan, 初始值: 819


// key: 35, value: Cynthia
// key: 45, value: Clayton
// key: 57, value: Donnie
// key: 77, value: David
// key: 95, value: Danny
// key: 116, value: Mike
// key: 132, value: Jennifer
// key: 134, value: Jonathan