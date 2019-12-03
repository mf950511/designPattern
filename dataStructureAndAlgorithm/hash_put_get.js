function Hash(){
  this.tableLength = 137
  this.table = new Array(this.tableLength)
}

Hash.prototype = {
  put: function(key, value){
    let pos = this.betterHash(key)
    this.table[pos] = value
  },
  betterHash: function(data){
    let H = 31, total = 0
    for(let i = 0; i < data.length; i++) {
      total += H * total + data.charCodeAt(i)
    }
    return total % this.tableLength
  },
  get: function(key){
    key = this.betterHash(key)
    console.log(this.table[key])
    return this.table[key]
  }
}

let someName = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan']
let has = new Hash()
someName.map((item, index) => {
  has.put('100' + index, item)
})

has.get('1002')