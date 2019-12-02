function Node(element){
    this.element = element
    this.next = null
}
function LList(){
    this.head = new Node('head')
    this.head.next = this.head
}

LList.prototype = {
    find: function(item){
        let currNode = this.head
        while(currNode.next !== null && currNode.element !== item){
            currNode = currNode.next
        }
        return currNode
    },
    display: function(){
        let currNode = this.head
        let str = ''
        while(currNode.next !== this.head) {
            currNode = currNode.next
            str += currNode.element + '  '
        }
        console.log(str)
        return str
    },
    insert: function(newElement, item){
        let currNode = this.find(item)
        let node = new Node(newElement)
        node.next = currNode.next
        currNode.next = node
    },
    findPrev: function(item){
        let currNode = this.head
        while(currNode.next !== null && currNode.next.element !== item) {
            currNode = currNode.next
        }
        return currNode
    },
    remove: function(item){
        let preItem = this.findPrev(item)
        if(preItem.next !== null) {
            preItem.next = preItem.next.next
        }
    }
}

let l = new LList()
l.insert('A', 'head')
l.insert('B', 'A')
l.display()
l.remove('A')
l.display()