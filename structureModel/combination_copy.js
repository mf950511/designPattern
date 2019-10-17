function inherit(obj){
    function F(){}
    F.prototype = obj
    return new F()
}
function inheritObject(Subclass, Superclass){
    Subclass.prototype = inherit(Superclass.prototype)
    Subclass.prototype.constructor = Subclass
}

function News(){
    this.children = []
    this.element = null
}

News.prototype = {
    getElement: function(){
        throw new Error('不可调用抽象方法')
    },
    add: function(){
        throw new Error('不可调用抽象方法')
    },
    init: function(){
        throw new Error('不可调用抽象方法')
    }
}

function Container(parent){
    News.call(this)
    this.parent = parent
    this.init()
}
inheritObject(Container, News)
Container.prototype.show = function(){
    this.parent.appendChild(this.element)
}
Container.prototype.init = function(){
    let ul = document.createElement('ul')
    ul.className = 'news-wrapper'
    this.element = ul
}
Container.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Container.prototype.getElement = function(){
    return this.element
}

function Item(){
    News.call(this)
    this.init()
}
inheritObject(Item, News)
Item.prototype.init = function(){
    let li = document.createElement('li')
    this.element = li
}
Item.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Item.prototype.getElement = function(){
    return this.element
}

function ItemGroup(){
    News.call(this)
    this.init()
}

inheritObject(ItemGroup, News)

ItemGroup.prototype.init = function(){
    let div = document.createElement('div')
    this.element = div
}
ItemGroup.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
ItemGroup.prototype.getElement = function(){
    return this.element
}

function TextNews(text, href){
    News.call(this)
    this.init(text, href)
}
inheritObject(TextNews, News)
TextNews.prototype.init = function(text, href){
    let ne = document.createElement('a')
    ne.href = href
    ne.innerHTML = text
    this.element = ne
}
TextNews.prototype.add = function(){}
TextNews.prototype.getElement = function(){
    return this.element
}

function ImageNews(url, href, className){
    News.call(this)
    this.init(url, href, className)
}
inheritObject(ImageNews, News)
ImageNews.prototype.init = function(url, href, className){
    let news = document.createElement('a')
    let image = new Image()
    image.src = url
    image.className = className
    news.appendChild(image)
    news.href = href
    this.element = news
}

ImageNews.prototype.add = function(){}
ImageNews.prototype.getElement = function(){
    return this.element
}

var parent = document.querySelector('.container')

var container = new Container(parent)
container.add(new Item().add(
    new TextNews('我是单独的一行', '#')
)).add(new Item().add(
    new ItemGroup().add(
        new ImageNews('http://pic26.nipic.com/20121221/9252150_142515375000_2.jpg', '#', 'small')
    ).add(
        new TextNews('我跟图片一行', '#')
    )
)).show()
// container