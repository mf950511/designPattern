function BetterHash(){
  this.tableLength = 137
  this.table = new Array(this.tableLength)
}

BetterHash.prototype = {
  simplePut: function(value){
    let pos = this.simpleHash(value)
    this.table[pos] = value
  },
  betterPut: function(value){
    let pos = this.betterHash(value)
    this.table[pos] = value
  },
  betterHash: function(data){
    let H = 31, total = 0
    for(let i = 0; i < data.length; i++) {
      total += total * H + data.charCodeAt(i)
    }
    total = total % this.tableLength
    if(total < 0 ){
      total += this.tableLength - 1
    }
    return parseInt(total)
  },
  simpleHash: function(data){
    let total = 0
    for(let i = 0; i < data.length; i++) {
      total += data.charCodeAt(i)
    }
    return total % this.tableLength
  },
  showDistro: function(){
    this.table.forEach((item, index) => {
      if(item !== undefined) {
        console.log(`key:${index}, -> value: ${item}`)
      }
    })
  },
  showDistro1: function(){
    this.table.forEach((item, index) => {
      if(item !== undefined) {
        console.log(`key1 :${index}, -> value1 : ${item}`)
      }
    })
  }
}

function getIntRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getStudent(arr) {
  for(let i = 0; i < arr.length; i++) {
    let str = ''
    for(let j = 0; j < 10; j++) {
      str += Math.floor(Math.random() * 10)
    }
    str += getIntRandom(50, 100)
    arr[i] = str
  }
  return arr
}

let hash = new BetterHash()
let hash1 = new BetterHash()

let stuArr = new Array(10)
let students = getStudent(stuArr)
students.forEach(item => {
  console.log(`前八位：${item.substring(0, 8)}, 后两位：${item.substring(10)}`)
  hash.simplePut(item)
  hash1.betterPut(item)
})

hash.showDistro()
hash1.showDistro1()

