Graph = function(){
    this.vertices = [];
    this.edges = [];
};

Vertex = function(x, y){
    this.x = x;
    this.y = y;
};

Edge = function(a, b) {
    this.a = a;
    this.b = b;
};

Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
};

Graph.prototype.generateEdges = function() {
    var cursor = 0;
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        cursor++;
        for (var j = cursor; j < size; j++) {
            if (i == j) {
                continue;
            }
            this.edges.push(new Edge(this.vertices[i], this.vertices[j]))
        }
    }
};