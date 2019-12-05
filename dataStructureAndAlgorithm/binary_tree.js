function Node(data){
  this.data = data
  this.left = null
  this.right = null
}


function BinaryTree(){
  this.root = null
}

BinaryTree.prototype = {
  insert: function(data){
    let newNode = new Node(data)
    let current = this.root
    if(current === null) {
      this.root = newNode
      return
    }
    while(current !== null) {
      if(current.data > data) {
        if(current.left === null) {
          current.left = newNode
          break
        } else {
          current = current.left
          continue
        }
      }
      if(current.data < data) {
        if(current.right === null) {
          current.right = newNode
          break
        } else {
          current = current.right
          continue
        }
        
      }
    }
  },
  cenOrder: function(){
    cenOrder(this.root)
  },
  preOrder: function(){
    preOrder(this.root)
  },
  postOrder: function(){
    postOrder(this.root)
  },
  find: function(data){
    let current = this.root
    while(current !== null) {
      if(data > current.data) {
        current = current.right
        continue
      } else if(data < current.data) {
        current = current.left
        continue
      } else {
        return current
      }
    }
    return null
  },
  getMax: function(node){
    while(node.right !== null) {
      node = node.right
    }
    return node
  },
  getMin: function(node){
    while(node.left !== null) {
      node = node.left
    }
    return node
  },
  remove: function(data){
    
  }
}

function cenOrder(node){
  if(node !== null) {
    cenOrder(node.left)
    console.log(`先序-> ${node.data}`)
    cenOrder(node.right)
  }
}

function preOrder(node){
  if(node !== null) {
    console.log(`中序-> ${node.data}`)
    preOrder(node.left)
    preOrder(node.right)
  }
}

function postOrder(node) {
  if(node !== null) {
    postOrder(node.left)
    postOrder(node.right)
    console.log(`后序-> ${node.data}`)
  }
}


let b = new BinaryTree()
b.insert(23)
b.insert(7)
b.insert(29)
b.insert(34)
b.insert(12)
b.insert(4)
b.insert(24)
b.insert(3)
b.insert(5)
b.insert(8)
b.insert(13)
b.cenOrder()

b.preOrder()
b.postOrder()

console.log(b.find(12))

