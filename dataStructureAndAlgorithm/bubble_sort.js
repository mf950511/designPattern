function CArray(numElements){
  this.numElements = numElements
  this.dataStore = []
  for(let i = 0; i < this.numElements; i++) {
    this.dataStore[i] = i
  }

}

CArray.prototype = {
  insert: function(num){
    this.dataStore.push(num)
  },
  setData: function(){
    this.dataStore = this.dataStore.map((item, index) => Math.floor((Math.random() * (this.dataStore.length + 1))))
  },
  clear: function(){
    this.dataStore = this.dataStore.map(item => 0)
  },
  toString: function(){
    let str = ''
    this.dataStore.forEach((item,index) => {
      if(index && index % 10 === 0) {
        str += '\n'
      }
      str += item + ' '
    })
    console.log(str)
  },
  swap: function(arr, index, index1){
    let temp = arr[index]
    arr[index] = arr[index1]
    arr[index1] = temp
  },
  bubbleSort: function(){ // 从第一个元素开始每个元素都与它相邻的元素比较，大于他则进行位置交换
    let len = this.dataStore.length
    for(let i = len; i >= 2; --i) {
      for(let j = 0; j <= i - 1; j++) {
        if(this.dataStore[j] > this.dataStore[j + 1]) {
          this.swap(this.dataStore, j, j+1)
        }
      }
      this.toString()
    }
  },
  selectSort: function(){
    let len = this.dataStore.length, min
    for(let i = 0; i <= len - 2; i++) {
      min = i
      for(let j = i + 1; j <= len - 1; j++) {
        if(this.dataStore[j] < this.dataStore[min]) {
          min = j
        }
        this.swap(this.dataStore, i, min)
      }
      this.toString()
    }
  },
  insertSort: function(){
    let len = this.dataStore.length
    for(let i = 0; i <= len - 1; i++) {
      let temp = this.dataStore[i]
      let now = i
      while(now > 0 && this.dataStore[now - 1] >= temp){
        this.dataStore[now] = this.dataStore[now - 1]
        now--
      }
      this.dataStore[now] = temp
    }
  }
}

let a = new CArray(10)
a.setData()
a.toString()
// a.bubbleSort()
// a.selectSort()
a.insertSort()
a.toString()