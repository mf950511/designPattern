function Storage(preId, sep){
    this.preId = preId
    this.sep = sep
    this.Storage = window.localStorage
    this.status = {
        FAIL: 0,
        SUCCESS: 1,
        TIMEOUT: 2,
        OVERFLOW: 3
    }
}

Storage.prototype = {
    get: function(key, callback){
        let status = this.status.SUCCESS, value = null, result

        try{
            value = this.Storage.getItem(this.preId + key)
        } catch(e) {
            value = null
            status = this.status.FAIL
            result = {
                value: null,
                status: this.status.FAIL
            }
            callback && callback(result)
            return result
        }
        if(value) {
            const sepIndex = value.indexOf(this.sep)
            const time = +value.slice(sepIndex + this.sep.length)
            if(new Date().getTime() < new Date(time).getTime() || +time === 0) {
                value = value.slice(0, sepIndex)
                return result = {
                    value: value.slice(0, sepIndex),
                    status: this.status.SUCCESS
                }
            } else {
                value = null
                status = this.status.TIMEOUT
                this.remove(this.preId + key)
            }
        } else {
            status = this.status.FAIL
        }
        result = {
            status,
            value
        }
        callback && callback(result)
        return result
        
        
    },
    set: function(key, value, callback, time){
        let status = this.status.SUCCESS
        key = this.preId + key
        // 设置过期事件，若无该时间则设置为一个月后
        try{
            time = new Date(time).getTime() || time.getTime()
        }catch(e){
            time = new Date().getTime() + 30 * 24 * 60 * 60 * 1000
        }
        const saveValue = value + this.sep + time
        try{
            this.Storage.setItem(key, saveValue)
        }catch(e) {
            status = this.status.OVERFLOW
        }
        callback && callback(status, key, saveValue)
    },
    remove: function(key, callback){
        let status = this.status.FAIL
        key = this.preId + key
        try{
            this.Storage.removeItem(key)
            status = this.status.SUCCESS
        } catch(e){

        }
        callback && callback(status)

    }
}