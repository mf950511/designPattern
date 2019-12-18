function seqSearch(arr, data){
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === data) {
      if(i > arr.length * 0.2) {
        swap(arr, i, i - 1)
      }
      return true
    }
  }
  return false
}

function swap(arr, index1, index2){
  let temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

let nums = []
for(let i = 0; i < 100; i++) {
  nums[i] = Math.floor(Math.random() * 101)
}

if(seqSearch(nums, 24)) {
  console.log('找到了')
} else {
  console.log('没找到')
}