function Hash(){
  this.tableLength = 137
  this.table = new Array(this.tableLength)
}

Hash.prototype = {
  put: function(data){
    let pos = this.simpleHash(data)
    if(this.table[pos] === undefined) {
      this.table[pos] = [data]
    } else {
      this.table[pos].push(data)
    }
  },
  simpleHash: function(data){
    let total = 0
    for(let i = 0; i < data.length; i++) {
      total += data.charCodeAt(i)
    }
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