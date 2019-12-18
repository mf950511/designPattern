function CArray(number){
  this.dataStore = []
  this.number = number
  this.shellArray = [5, 3, 1]
  for(let i = 0; i < number; i++) {
    this.dataStore.push(Math.floor(Math.random() * (number + 1)))
  }
}

CArray.prototype = {
  swap: function(index1, index2, arr){
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  },
  insertSort: function(){
    for(let i = 0; i < this.number; i++) {
      let temp = this.dataStore[i]
      let j = i
      while(j > 0 && (this.dataStore[j - 1] > temp)) {
        this.dataStore[j] = this.dataStore[j - 1]
        j--
      }
      this.dataStore[j] = temp
    }
  },
  showArray: function() {
    let str = ''
    this.dataStore.forEach(item => {
      str += item + ' '
    })
    console.log(str)
  },
  shellSort: function(){
    for(let g = 0; g < this.shellArray.length; ++g) {
      for(let i = this.shellArray[g]; i < this.dataStore.length; ++i) {
        let temp = this.dataStore[i]
        for(var j = i; j >= this.shellArray[g] && this.dataStore[j - this.shellArray[g]] > temp; j-= this.shellArray[g]) {
          this.dataStore[j] = this.dataStore[j - this.shellArray[g]]
        }
        this.dataStore[j] = temp
      }
    }
  },
  qSort: function(arr){ // 快速排序
    if(!arr.length) {
      return []
    }
    let temp = arr[0], lessArr = [], moreArr = []
    for(let i = 1; i < arr.length; i++) {
      if(arr[i] < temp) {
        lessArr.push(arr[i])
      } else {
        moreArr.push(arr[i])
      }
    }
    return this.qSort(lessArr).concat(temp, this.qSort(moreArr))
  }
}

let arr = new CArray(10000)
// arr.showArray()
console.time('insert')
arr.shellSort(arr.dataStore)
console.timeEnd('insert')
// arr.showArray()
console.time('insert1')
arr.dataStore.sort((a, b) => a-b)
console.timeEnd('insert1')