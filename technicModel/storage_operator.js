function Storage(userId, sep){
    this.userId = userId  // 开发者标识
    this.sep = sep || '|_|'       // 数据分隔符
    this.Storage = localStorage || window.localStorage
    this.status = { // 操作状态值
      FAILUER: 0,   // 失败
      SUCCESS: 1,   // 成功
      TIMEOUT: 2,   // 过期
      OVERFLOW: 3   // 溢出
    }
  }

  Storage.prototype = {
    // 方便后续获取键名
    getKey: function(key){
      return this.userId + key
    },
    get: function(userKey, cb){
      let key = this.getKey(userKey)
      let status = this.status.SUCCESS
      let value, sepIndex, time, result
      try {
        value = this.Storage.getItem(key)
      } catch(e) {
        value = null
        status = this.status.FAILURE
        result = {
          value,
          status
        }
        cb && cb(result)
        return result
      }
      if(value) {
        sepIndex = value.indexOf(this.sep)
        time = value.slice(0, sepIndex)
        // 查看内容是否过期
        if(new Date().getTime() < new Date(time).getTime() || +time === 0){
          value = value.slice(sepIndex + this.sep.length)
        } else {
          status = this.status.TIMEOUT
          value = null
          this.remove(key)
        }
      } else {
        value = null
      }
      result = {
        value,
        status
      }
      cb && cb(result)
      return result
    },
    set: function(userKey, value, time = 0, cb){
      let key = this.getKey(userKey)
      let status = this.status.FAILURE
      let result
      // 是否设置时间，未设置默认一个月
      try {
        time = new Date(time).getTime()
        console.log(time)
      } catch (e) {
        time = new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      }
      const realValue = time + this.sep + value
      // 检查是否数据过多溢出
      try {
        this.Storage.setItem(key, realValue)
      } catch (e) {
        status = this.status.OVERFLOW
      }
      result = {
        status
      }
      cb && cb(result)
      return result
    },
    remove: function(userKey, cb){
      let status = this.status.FAILUER
      let key = this.getKey(userKey)
      let result
      try {
        this.Storage.removeItem(key)
        status = this.status.SUCCESS
      } catch(e) {
      }
      result = {
        status
      }
      cb && cb(result)
      return result
    }
  }

let myStorage = new Storage('zhangsan-')
myStorage.set('name', '张三')
myStorage.get('name')  // {value: '张三', status: 1}
myStorage.remove('name')