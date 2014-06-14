Graph = function(){
    this.vertices = [];
    this.edges = [];
    this.fitness = {};
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

Graph.prototype.randomizeVertices = function(nbr, width, height, walls) {
    this.vertices = [];
    for (var i = 0; i < nbr; i++) {
        var noCollide, vertex;
        do {
            noCollide = true;
            vertex = new Vertex(width * Math.random(), height * Math.random());
            for (var k = 0, size2 = walls.length; k < size2; k++) {
                if (isPointInWall(vertex, walls[k])) {
                    noCollide = false;
                    break;
                }
            }
        } while(!noCollide);
        this.vertices.push(vertex);
    }
};

Graph.prototype.randomize = function(walls, canvasElement) {
    var nbr = 20;
    var width = canvasElement.width;
    var height = canvasElement.height;

    var time_graph = new Date().getTime();

    this.randomizeVertices(nbr, width, height, walls);

    this.generateEdges();
    var edgeList = this.edges;
    this.edges = [];

    console.log("edgelist = " + edgeList.length);
    console.log("edge = " + this.edges.length);
    console.log("walls = " + walls.length);

    for (var j = 0, size = edgeList.length; j < size; j++) {
        var insert = true;
        var edgeToTest = edgeList[j];
        for (var k = 0, size2 = walls.length; k < size2; k++) {
            if (doEdgeIntersectsWall(edgeToTest, walls[k])) {
                insert = false;
                break;
            }
        }
        if (insert) {
            this.edges.push(edgeToTest);
        }
    }

    console.log("time = " + (new Date().getTime() - time_graph) + "ms, edge counter = " + this.edges.length);
};

Graph.prototype.draw = function(context) {
    context.strokeStyle="#00F";
    for (var j = 0, edgesSize = this.edges.length; j < edgesSize; j++) {
        context.beginPath();
        context.moveTo(this.edges[j].a.x, this.edges[j].a.y);
        context.lineTo(this.edges[j].b.x, this.edges[j].b.y);
        context.stroke();
    }
    context.strokeStyle="#F00";
    for (var i = 0, verticesSize = this.vertices.length; i < verticesSize; i++) {
        context.beginPath();
        context.arc(this.vertices[i].x, this.vertices[i].y, 4, 0, 2*Math.PI);
        context.stroke();
    }
};

Graph.prototype.hasVertex = function(position) {
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        var vertex = this.vertices[i];
        if (vertex.x == position[0] && vertex.y == position[1]) {
            return true;
        }
    }
    return false;
};

Edge.prototype.getSquareDist = function() {
    var deltaX = this.a.x - this.b.x;
    var deltaY = this.a.y - this.b.y;
    return deltaX * deltaX + deltaY * deltaY;
};

Graph.prototype.setConnections = function(walls) {

    for (var vertex in this.vertices) {
        this.vertices[vertex].neighbourgs = [];
    }

    var cursor = 0;
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        cursor++;
        var pointA = [this.vertices[i].x, this.vertices[i].y];
        for (var j = cursor; j < size; j++) {
            var pointB = [this.vertices[j].x, this.vertices[j].y];
            if (!doSegmentIntersectsWithWalls([pointA, pointB], walls)) {
                this.vertices[i].neighbourgs.push(this.vertices[j]);
                this.vertices[j].neighbourgs.push(this.vertices[i]);
            }
        }
    }
};