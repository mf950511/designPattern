function Element(element){
    this.element = element
    this.next = null
}
function Llinked(){
    this.head = new Element('head')   
}

Llinked.prototype = {
    find: function(item) {
        let currNode = this.head
        while(currNode.next !== null && currNode.element !== item) {
            currNode = currNode.next
        }
        return currNode
    },
    findLast: function(){
        let currNode = this.head
        while(currNode.next !== null) {
            currNode = currNode.next
        }
        return currNode
    },
    findPreview: function(item){
        let currNode = this.head
        while(currNode.next !== null && currNode.next.element !== item) {
            currNode = currNode.next
        }
        return currNode
    },
    insert: function(newElement, item){ // 指定插入位置则在插入位置之后，未指定则插入到最后一个元素
        let node = new Element(newElement)
        let currNode = this.find(item)
        node.next = currNode.next
        currNode.next = node
    },
    display: function(){
        let str = '', currNode = this.head
        while(currNode.next != null) {
            str += currNode.next.element + ' '
            currNode = currNode.next
        }
        console.log(str)
        return str
    },
    remove: function(item){
        let findItem = this.findPreview(item)
        if(findItem.next !== null) {
            findItem.next = findItem.next.next
        }
    }
}

let llist = new Llinked()
llist.insert('张三')
llist.insert('李四')
llist.insert('王五', '张三')
llist.display()
llist.remove('张三')
llist.display()
llist.remove('李四')
llist.display()
llist.remove('王五')
llist.display()