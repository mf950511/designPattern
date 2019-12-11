function Vertex(label, wasVisited){
  this.label = label
  this.wasVisited = wasVisited
}

function Graph(v){
  this.vertice = v
  this.adj = []
  this.edges = 0
  this.marked = []
  this.edgeTo = []
  this.vertexList = []
  for(let i = 0; i < v; i++) {
    this.adj[i] = []
    this.marked[i] = false
  }

}

Graph.prototype = {
  addEdge: function(v, w){
    this.adj[v].push(w)
    this.adj[w].push(v)
    this.edges++
  },
  showGraph: function(){
    for(let i = 0; i < this.vertice; i++) {
      console.log(`顶点${i}的强连接顶点为->`)
      for(let j = 0; j < this.vertice; j++) {
        if(this.adj[i][j] !== undefined) {
          console.log(this.adj[i][j])
        }
      }
    }
  },
  showGraphByName: function(){
    let visited = []
    for(let i = 0; i < this.vertice; i++) {
      console.log(this.vertexList[i] + '->')
      visited.push(this.vertexList[i])
      for(let j = 0; j < this.vertice; j++) {
        if(this.adj[i][j] !== undefined) {
          if(visited.indexOf(this.vertexList[j]) < 0) {
            console.log(this.vertexList[j] + ' ')
          }
        }
      }
      visited.pop()
    }
  },
  depthTraversal: function(v){
    this.marked[v] = true
    if(this.adj[v]) {
      console.log(`深度遍历:${v}`)
    }
    this.adj[v].forEach(item => {
      if(!this.marked[item]) {
        this.depthTraversal(item)
      }
    })
  },
  breadthTraversal: function(v){
    this.marked = this.marked.map(item => false)
    let quene = []
    this.marked[v] = true
    quene.push(v)
    while(quene.length > 0) {
      let a = quene.shift()
      if(this.adj[a]) {
        console.log(`广度遍历${a}`)
      }
      this.adj[a].forEach(item => {
        if(!this.marked[item]){
          this.marked[item] = true
          quene.push(item)
        }
      })
    }
  },
  bfs: function(v){
    this.marked = this.marked.map(item => false)
    let quene = []
    quene.push(v)
    this.marked[v] = true
    while(quene.length) {
      let a = quene.shift()
      if(this.adj[a]) {
        console.log(`优化版广度遍历${a}`)
      }
      this.adj[a].forEach(item => {
        if(!this.marked[item]) {
          this.marked[item] = true
          this.edgeTo[item] = a
          quene.push(item)
        }
      })
    }
  },
  pathTo: function(v){
    let source = 0
    let path = []
    if(!this.marked[v]) {
      return null
    }
    for(let i = v; i != source; i = this.edgeTo[i]) {
      path.push(i)
    }
    path.push(source) 
    return path
  },
  topSort: function(){
    let stack = [], visited = []
    for(let i = 0; i < this.vertice; i++) {
      visited.push(false)
    }
    for(let i = 0; i < this.vertice; i++) {
      if(visited[i] == false) {
        this.topSortHelp(i, visited, stack)
      }
    }
    for(let i = 0; i < stack.length; i++) {
      if(stack[i] !== undefined && stack[i] !== false) {
        console.log(stack[i], this.vertexList[stack[i]])
      }
    }
  },
  topSortHelp: function(v, visited, stack){
    visited[v] = true
    this.adj[v].forEach(item => {
      if(visited[item] == false) {
        this.topSortHelp(item, visited, stack)
      }
    })
    stack.push(v)
  }
}





let g = new Graph(6)
// g.addEdge(0,1)
// g.addEdge(0,2)
// // g.addEdge(1,2)
// g.addEdge(1,3)
// g.addEdge(2,4)
// g.showGraph()
// g.depthTraversal(0)
// g.breadthTraversal(0)
// g.bfs(0)
// let paths = g.pathTo(4)
// while(paths && paths.length) {
//   console.log(paths.pop() + '-')
// }
g.addEdge(1, 2)
g.addEdge(2, 5)
g.addEdge(1, 3)
g.addEdge(1, 4)
g.addEdge(0, 1)
g.vertexList = ['cs1', 'cs2', 'data structures', 'asseble', 'operating', 'algorithms']
g.showGraphByName()
g.depthTraversal(0)
// g.topSort()