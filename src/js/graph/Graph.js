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

Graph.prototype.randomize = function(walls, canvasElement) {

    var width = canvasElement.width / 6;
    var height = canvasElement.height / 6;
    this.vertices = [];
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            var noCollide = true;
            var vertex = new Vertex(width * i, height * j);
            for (var k = 0, size2 = walls.length; k < size2; k++) {
                if (isPointInWall(vertex, walls[k])) {
                    noCollide = false;
                    break;
                }
            }
            if (noCollide)
                this.vertices.push(vertex);
        }
    }
    this.generateEdges();
    var edgeList = this.edges;
    this.edges = [];

    console.log("edgelist = " + edgeList.length);
    console.log("edge = " + this.edges.length);
    console.log("walls = " + walls.length);

    for (var j = 0, size = edgeList.length; j < size; j++) {
        var insert = true;
        var edgeToTest = edgeList[j];
        for (k = 0, size2 = walls.length; k < size2; k++) {
            if (doEdgeIntersectsWall(edgeToTest, walls[k])) {
                insert = false;
                break;
            }
        }
        if (insert) {
            this.edges.push(edgeToTest);
        }
    }

    console.log("edge counter= " + this.edges.length);
};

Graph.prototype.draw = function(context) {
    context.strokeStyle="#001";
    for (var i = 0, verticesSize = this.vertices.length; i < verticesSize; i++) {
        context.beginPath();
        context.arc(this.vertices[i].x, this.vertices[i].y, 4, 0, 2*Math.PI);
        context.stroke();
    }
    for (var j = 0, edgesSize = this.edges.length; j < edgesSize; j++) {
        context.beginPath();
        context.moveTo(this.edges[j].a.x, this.edges[j].a.y);
        context.lineTo(this.edges[j].b.x, this.edges[j].b.y);
        context.stroke();
    }
};