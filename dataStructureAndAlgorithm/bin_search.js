function binSearch(arr, data){
  let start = 0, end = arr.length - 1
  while(start <= end) {
    if((end - start <= 1) && (end!==data) && start !== data) { // 不在查询范围内
      return -1
    }
    let mid = Math.floor((start + end) / 2)
    console.log(arr[mid], mid, start, end, data)
    if(arr[mid] > data) {
      end = mid
    } else if(arr[mid] < data) {
      start = mid
    } else {
      return mid
    }
  }
  return -1
}

function count(arr, data){
  let i = binSearch(arr, data)
  let count = 0
  if(i > -1) {
    for(let j = i; j >= 0; j--) {
      if(arr[j] === data) {
        count++
      } else {
        break
      }
    }
    for(let k = i; k < arr.length; k++) {
      if(arr[k] === data) {
        count++
      } else {
        break
      }
    }
  }
  return count
}


let arr = []
for(let i = 0; i < 100; i++) {
  arr[i] = Math.floor(Math.random() * 101)
}

arr = arr.sort()
console.log(binSearch(arr, 24))
console.log(count(arr, 24))