// 贪心算法，每一步都只考虑当前一步的最优解，不考虑对后续的影响

// 贪心算法获取最小找钱数量
function makeChange(money, arr){
  arr = arr.sort((a, b) => b - a)
  for(let i = 0; i < arr.length; i++) {
    if(Math.floor(money / arr[i]) > 0) {
      console.log(Math.floor(money / arr[i]), '张', arr[i])
    }
    money = money % arr[i]
    
  }
}

let money = 63
let moneyArr = [25, 10, 5, 1]
makeChange(money, moneyArr)
// 2 '张' 25
// 1 '张' 10
// 3 '张' 1

// 贪心算法解决背包问题，假设每个物品都可拆分放入
// 假设商品价值为[50, 140, 60, 60]，重量为[5, 20, 10, 12],则性价比为[10, 7, 6, 5]
function ksack(weight, value, capacity){
  let load = 0
  let i = 0
  let max = 0
  while(load < capacity && i < value.length) {
    if(weight[i] < capacity - load) {
      max += value[i]
      load += weight[i]
      console.log(`放入重量为${weight[i]}, 价值为${value[i]}`)
    } else {
      console.log(`放入重量为${capacity - load}, 价值为${(capacity - load) / weight[i] * value[i]}`)
      max += ((capacity - load) / weight[i] * value[i])
      load = capacity
    }
    i++
  }
  console.log(`最大价值为${max}`)
  return max
}
let value = [50, 140, 60, 60]
let weight = [5, 20, 10, 12]
ksack(weight, value, 30)