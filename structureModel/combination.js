// 寄生组合继承需要的代码
function inherit(obj){
    function F(){}
    F.prototype = obj
    return new F()
}
function inheritPrototype(subClass, superClass){
    subClass.prototype = inherit(superClass.prototype)
    subClass.constructor = subClass
}
// 抽象一个新闻类，供功能使用
function News(){
    this.children = []
    this.element = null
}
News.prototype = {
    add: function(){
        throw new Error('请重写你的方法')
    },
    init: function(){
        throw new Error('请重写你的方法')
    },
    getElement: function(){
        throw new Error('请重写你的方法')
    }
}
// 最外层新闻容器元素
function Container(id, parent){
    News.call(this)
    this.parent = parent
    this.id = id
    this.init()
}
inheritPrototype(Container, News)
Container.prototype.show = function(){
    this.parent.appendChild(this.getElement())
}
Container.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Container.prototype.init = function(){
    this.element = document.createElement('ul')
    this.element.id = this.id
    this.element.className = 'new-container'
}
Container.prototype.getElement = function(){
    return this.element
}

// 每一组新闻的容器类
function Item(className){
    News.call(this)
    this.className = className
    this.init()
}
inheritPrototype(Item, News)
Item.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Item.prototype.init = function(){
    this.element = document.createElement('li')
    this.element.className = this.className
}
Item.prototype.getElement = function(){
    return this.element
}

// 行内新闻的容器类
function GroupNews(className){
    News.call(this)
    this.className = className
    this.init()
}
inheritPrototype(GroupNews, News)
GroupNews.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
GroupNews.prototype.init = function(){
    this.element = document.createElement('div')
    this.element.className = this.className
}
GroupNews.prototype.getElement = function(){
    return this.element
}

// 简单的图片新闻类
function ImageNews(url, href, className){
    News.call(this)
    this.url = url || ''
    this.href = href || '#'
    this.className = className || 'normal'
    this.init()
}
inheritPrototype(ImageNews, News)
ImageNews.prototype.init = function(){
    this.element = document.createElement('a')
    let img = new Image()
    img.src = this.url
    this.element.appendChild(img)
    this.element.href = this.href
    this.element.className = 'new-images ' + this.className
}

ImageNews.prototype.add = function(){}
ImageNews.prototype.getElement = function(){
    return this.element
}

// 简单的文字新闻类
function IconNews(text, href, type){
    News.call(this)
    this.text = text || ''
    this.href = href || '#'
    this.type = type || 'video'
    this.init()
}
inheritPrototype(IconNews, News)
IconNews.prototype.init = function(){
    this.element = document.createElement('a')
    this.element.href = this.href
    this.element.innerHTML = this.text
    this.element.className = 'icon ' + this.type
}
IconNews.prototype.add = function(){}
IconNews.prototype.getElement = function(){
    return this.element
}

// 带类型的文字新闻类
function TypeNews(text, href, type, pos){
    News.call(this)
    this.text = text || ''
    this.href = href || '#'
    this.type = type || ''
    this.pos = pos || 'left'
    this.init()
}
inheritPrototype(TypeNews, News)
TypeNews.prototype.init = function(){
    this.element = document.createElement('a')
    this.element.href = this.href
    if(this.pos === 'left') {
        this.element.innerHTML = `[${this.type}] ${this.text}`
    } else {
        this.element.innerHTML = `${this.text} [${this.type}]`
    }
    this.className = 'text'
}
TypeNews.prototype.add = function(){}
TypeNews.prototype.getElement = function(){
    return this.element
}

// 实现新闻的添加
let container = new Container('container', document.querySelector('.container'))
container.add(new Item('normal').add(
    new IconNews('我是文字新闻啊', '', 'music')
)).add(new Item('normal').add(
    new ImageNews('http://pic39.nipic.com/20140307/13928177_195158772185_2.jpg', '#', 'big')
)).add(new Item('normal').add(
    new GroupNews('has-child').add(
        new ImageNews('http://pic38.nipic.com/20140228/2457331_083845176000_2.jpg', '#', 'small')
    ).add(
        new TypeNews('我是类可行新闻啊', '', '新闻类', 'right')
    ).add(
        new IconNews('我是行内新闻啊', '', 'text')
    )
))

container.show()
