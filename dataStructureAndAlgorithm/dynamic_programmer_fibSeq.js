// 动态规划获取斐波那契数列指定下标的值
function recurFib(n){
  if(n < 2) {
    return n
  }
  return recurFib(n - 1) + recurFib(n - 2)
}

function dynFib(n){
  let val = []
  for(let i = 0; i < n; i++) {
    val[i] = 0
  }
  if(n === 1 || n ===2) {
    return 1
  } else {
    val[1] = 1
    val[2] = 1
    for(let i = 3; i <= n; i++) {
      val[i] = val[i - 1] + val[i - 2]
    }
    return val[n]
  }
}

// 递归效率较为低下
console.time('recur')
console.log(recurFib(30)) // recur: 12.060ms
console.timeEnd('recur')
console.time('dyn')
console.log(dynFib(30))  // dyn: 0.313ms
console.timeEnd('dyn') 