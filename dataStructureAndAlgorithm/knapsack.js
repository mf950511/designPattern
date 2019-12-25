
// 背包问题，现有一堆物品，各自有重量与价值，如何在背包容量固定的情况下选择最高价值的物品进去
// 思路：
// 对各个重量下的背包重量进行遍历，看看下面有那些物品的排放规则，第一次遍历背包容量为0，什么都放置不下，第二次遍历背包容量为1，尝试是否有物品可以放置，直到遍历至背包容量为止 （见循环c）
// 同时对各个商品进行遍历，查看何时能拥有最高价值，第一次遍历只能用第一个物品，第二次遍历可以用第一个跟第二个，第三次遍历可以用前三个物品，最后一次便利可以使用全部物品 （见循环v）
// 对价值进行遍历的同时对商品进行遍历，直到所有商品所有重量全部查看完毕，取最大重量最多物品的组合值即为最优解
// 按照重量的升序进行数据排列，接着从重量最小的开始往背包中放，然后组合重量最小的与重量第二小的放里面放，直到组合所有重量的放里面放，对比何时的价值最高

function napsack(capacity, value, price,  n){
  let arr = []
  // 遍历价值
  for(let c = 0; c <= capacity; c++) {
    arr[c] = []
    // 遍历每一个物品
    for(let v = 0; v < value.length; v++) {
      if(c === 0) {
        arr[c][v] = 0
        continue
      }
      // 当前物品重量超过总重量
      if(c < value[v]) {
        if(v === 0) {
          arr[c][v] = 0
        } else {
          arr[c][v] = arr[c][v - 1]
        }
        continue
      }
      // 只有第一个物品的时候， 当重量小于总重量就把第一个物品的价值放在这一栏里
      if(v === 0) {
        arr[c][v] = price[v]
      } else {
        // 有多个物品的时候，就要对比这次遍历的物品价值跟扣除重量后剩余重量的最大价值之和与上个重量的最大价值谁大，谁大就采用谁填充此格子
        let maxPrice = Math.max(price[v] + arr[c - value[v]][v - 1], arr[c][v - 1])
        arr[c][v] = maxPrice
      }
    }
  }
  return arr
}

let capacity = 16
let value = [15, 3, 6, 12, 1] // 重量
let price = [21, 45, 15, 200, 100] // 价值

let number = napsack(capacity, value,price,  value.length)
console.log(number)

