// 最小钞票数量
// 问题：在已有钞票组合的情况下获取钞票数量最小的张数
function getMinNumber(number, money){
  if(number === 0) {
    return 0
  }
  if(money.length === 0) {
    return -1
  }
  let arr = []
  for(let i = 0; i <= number; i++) {
    arr[i] = -1
  }
  for(let i = 0; i < money.length; i++) {
    if(money[i] < number) {
      arr[money[i]] = 1
    }
    if(money[i] === number) {
      return 1
    }
  }
  for(let i = 1; i <= number; i++) {
    for(let j = 0; j < money.length; j++){
      if(i - money[j] >= 0 && arr[i - money[j]] !== -1) {
        if(arr[i] > arr[i - money[j]] + 1 || arr[i] === -1) {
          arr[i] = arr[i - money[j]] + 1
        }
        console.log(i, money[j], arr[i])
      }
    }
  }
  return arr[number]
}

let money = [1, 3, 5, 11, 14]

console.log(getMinNumber(21,money))