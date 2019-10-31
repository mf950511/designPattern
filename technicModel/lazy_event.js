// var on = (function(){
//     if(document.addEventListener){
//         return function(ele, type, fn){
//             ele.addEventListener(type, fn, false)
//         }
//     } else if(document.attachEvent) {
//         return function(ele, type, fn) {
//             ele.attachEvent('on' + type, fn)
//         }
//     } else {
//         return function(ele, type, fn) {
//             ele['on' + type] = fn
//         }
//     }
// })()

var on = function(ele, type, fn){
    if(document.addEventListener) {
        on = function(ele, type, fn){
            ele.addEventListener(type, fn, false)
        }
    } else if(document.attachEvent) {
        on = function(ele, type, fn) {
            ele.attachEvent('on' + type, fn)
        }
    } else {
        on = function(ele, type, fn) {
            ele['on' + type] = fn
        }
    }
    on(ele, type, fn)
}

console.log(on)
// ƒ (ele, type, fn){
//     if(document.addEventListener) {
//         on = function(ele, type, fn){
//             ele.addEventListener(type, fn, false)
//         }
//     } else if(document.attachEvent) {
//     …

on(document.getElementById('app'), 'click', function(){
    console.log('我被点击了')
})
console.log(on)
// ƒ (ele, type, fn){
//     ele.addEventListener(type, fn, false)
// }