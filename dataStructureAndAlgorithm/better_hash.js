function BetterHash(){
  this.tableLength = 137
  this.table = new Array(this.tableLength)
}

BetterHash.prototype = {
  put: function(value){
    let pos = this.betterHash(value)
    this.table[pos] = value
  },
  betterHash: function(data){
    let H = 31, total = 0
    for(let i = 0; i < data.length; i++) {
      total += total * H + data.charCodeAt(i)
    }
    console.log(`初始值:${data},  -> ${total}`)
    total = total % this.tableLength
    if(total < 0 ){
      total += this.tableLength - 1
    }
    return parseInt(total)
  },
  showDistro: function(){
    this.table.forEach((item, index) => {
      if(item !== undefined) {
        console.log(`key:${index}, -> value: ${item}`)
      }
    })
  }
}

let someName = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan']
let has = new BetterHash()
someName.map(item => {
  has.put(item)
})
has.showDistro()

// 初始值:David,  -> 74605956
// 初始值:Jennifer,  -> 2654878442770
// 初始值:Donnie,  -> 2401813893
// 初始值:Raymond,  -> 91432176164
// 初始值:Cynthia,  -> 76120042881
// 初始值:Mike,  -> 2634181
// 初始值:Clayton,  -> 75670380110
// 初始值:Danny,  -> 74597945
// 初始值:Jonathan,  -> 2665602591886


// key:3, -> value: David
// key:25, -> value: Raymond
// key:37, -> value: Donnie
// key:61, -> value: Jonathan
// key:75, -> value: Danny
// key:82, -> value: Mike
// key:102, -> value: Jennifer
// key:130, -> value: Clayton
// key:131, -> value: Cynthia