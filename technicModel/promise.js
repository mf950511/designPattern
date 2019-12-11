function Primise(fn){
  if(typeof fn !== 'function') {
    throw new Error('primise must receive a function')
  }
  this.status = 'pending'
  this.resolveFn = []
  this.rejectFn = []
  let resolve = (value) => {
    if(this.status === 'pending'){
      this.status = 'resolved'
      this.value = value
      this.resolveFn.forEach(item => {
        item(value)
      })
    }
    
  }
  let reject = (value) => {
    if(this.status === 'pending'){
      this.status = 'rejected'
      this.value = value
      this.rejectFn.forEach(item => {
        item(value)
      })
    }
    
  }
  fn(resolve, reject)
}

Primise.prototype.then = function(fn1, fn2){
  let self = this, promise2
  return promise2 = new Primise((resolve, reject) => {
    if(this.status === 'resolved') {
      let a = fn1(self.value)
      resolve(a)
    }
    if(this.status === 'rejected') {
      let b = fn2(self.value)
      reject(b)
    }
    if(this.status === 'pending') {
      self.resolveFn.push(() => {
        let a = fn1(self.value)
        resolve(a)
      })
      self.rejectFn.push(() => {
        let b = fn2(self.value)
        reject(b)
      })
    }
  })
  
}

let p = new Primise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 2000)
  // resolve(234)
}).then(res => {
  console.log(res)
})