function lcs(word1, word2){
  let arr1 = []
  let max = 0
  let index = 0
  for(let i = 0; i < word1.length; i++) {
    arr1[i] = []
    for(let j = 0; j < word2.length; j++) {
      arr1[i][j] = 0
    }
  }
  for(let i = 0; i < word1.length; i++) {
    for(let j = 0; j < word2.length; j++) {
      if(word1[i] === word2[j]) {
        if(word1[i - 1] === word2[j - 1]) {
          arr1[i][j] = arr1[i - 1][j - 1] + 1
        } else {
          arr1[i][j] = 1
        }
        if(arr1[i][j] > max) {
          max = arr1[i][j]
          index = i
        }
      }
    }
  }
  let startIndex = index - max + 1
  console.log(`开始下标为${ startIndex },最长长度为${max},字符串为${ word1.substring(startIndex, index + 1) }`)
}

lcs('laaasasdasdasdddddd', 'dasasdasdasd')
lcs('asddd', 'bcddd')