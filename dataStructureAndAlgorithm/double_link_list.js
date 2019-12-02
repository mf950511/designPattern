function Node(element){
    this.element = element
    this.next = null
    this.prev = null
}
function DLList(){
    this.head = new Node('head')
}

DLList.prototype = {
    find: function(item){
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
    insert: function(newElement, item){
        let node = new Node(newElement)
        let currNode = this.find(item)
        node.prev = currNode
        node.next = currNode.next
        if(currNode.next) {
            currNode.next.prev = node
        }
        currNode.next = node
    },
    remove: function(item){
        let currNode = this.find(item)
        if(currNode.next !== null) {
            currNode.prev.next = currNode.next
            currNode.next.prev = currNode.prev
            currNode.next = null
            currNode.prev = null
            return
        }
        if(currNode.element === item) {
            currNode.prev.next = currNode.next
            currNode.prev = null
            currNode.next = null
        }
    },
    display: function(){
        let currNode = this.head, str = ''
        while(currNode.next !== null) {
            str += currNode.next.element + '  '
            currNode = currNode.next
        }
        console.log(str)
        return str
    },
    reDisplay: function(){
        let lastNode = this.findLast()
        let str = ''
        while(lastNode.element !== 'head') {
            str += lastNode.element + '  '
            lastNode = lastNode.prev
        }
        console.log(str)
        return str
    }
}

var s = new DLList()
s.insert('A')
s.insert('B')
s.insert('C', 'A')
s.display()
s.reDisplay()
s.remove('A')
s.display()
s.reDisplay()
s.remove('B')
s.display()
s.reDisplay()
// s.insert('D','B')
// s.display()