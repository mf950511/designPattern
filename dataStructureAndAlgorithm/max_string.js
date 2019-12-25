function lcs(word1, word2){
  let arr1 = []
  for(let i = 0; i < word1.length; i++) {
    arr1[i] = []
    for(let j = 0; j < word2.length; j++) {
      arr1[i][j] = 0
    }
  }
  for(let i = 0; i < word1.length; i++) {
    for(let j = 0; j < word2.length; j++) {
      if(word1[i] === word2[j]) {
        
      }
    }
  }
}