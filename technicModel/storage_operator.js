function Storage(preId, sep){
    this.preId = preId
    this.sep = sep
    this.Storage = window.localStorage
    this.status = {
        FAIL: 0,
        SUCCESS: 1,
        TIMEOUT: 2
    }
}

Storage.prototype = {
    get: function(key, callback){
        try{
            const value = this.Storage.getItem(this.preId + key)
            const sepIndex = value.indexOf(this.sep)
            const time = +value.slice(sepIndex + this.sep.length)
            if(new Date().getTime() > time || time === 0) {
                return result = {
                    value: value.slice(0, sepIndex),
                    status: this.status.SUCCESS
                }
            } else {
                return result = {
                    value: null,
                    status: this.status.TIMEOUT
                }
            }
        } catch(e) {
            return result = {
                value: null,
                status: this.status.FAIL
            }
        }
        
    },
    set: function(key, value, callback, time){
        try{
            const saveKey = this.preId + key
            const saveTime = new Date().getTime() + (time || 30 * 24 * 60 * 60 * 1000)
            const saveValue = value + this.sep + saveTime
            this.Storage.setItem(saveKey, saveValue)
            return result = {
                value: '',
                status: this.status.SUCCESS
            }
        }catch(e) {
            return result = {
                value: '发生错误',
                status: this.status.FAIL
            }
        }
    },
    remove: function(key){

    }
}