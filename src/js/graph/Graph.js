Graph = function(){
    this.vertices = [];
    this.fitness = {};
};

Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
};

Graph.prototype.randomizeVertices = function(nbr, width, height, walls) {
    this.vertices = [];
    for (var i = 0; i < nbr; i++) {
        var noCollide, vertex;
        do {
            noCollide = true;
            vertex = new Vertex(width * Math.random(), height * Math.random());
            for (var k = 0, size2 = walls.length; k < size2; k++) {
                if (isPointInWall([vertex.x, vertex.y], walls[k])) {
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

    this.randomizeVertices(nbr, width, height, walls);
    this.setConnections(walls);
};

Graph.prototype.draw = function(context) {

    var vertex, neighbor;
    for (var i in this.vertices) {
        vertex = this.vertices[i];

        context.strokeStyle="#00F";
        context.globalAlpha = 0.1;

        for (var j in vertex.neighbours) {
            neighbor = vertex.neighbours[j];
            context.beginPath();
            context.moveTo(vertex.x, vertex.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.stroke();
        }

        context.strokeStyle="#F00";
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(vertex.x, vertex.y, 4, 0, 2*Math.PI);
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

Graph.prototype.getSquareDist = function(pointA, pointB) {
    var deltaX = pointA[0] - pointB[0];
    var deltaY = pointA[1] - pointB[1];
    return deltaX * deltaX + deltaY * deltaY;
};

Graph.prototype.setConnections = function(walls) {

    for (var vertex in this.vertices) {
        this.vertices[vertex].neighbours = [];
    }

    var cursor = 0;
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        cursor++;
        var pointA = [this.vertices[i].x, this.vertices[i].y];
        for (var j = cursor; j < size; j++) {
            var pointB = [this.vertices[j].x, this.vertices[j].y];
            if (!doSegmentIntersectsWithWalls([pointA, pointB], walls)) {
                this.vertices[i].neighbours.push(this.vertices[j]);
                this.vertices[j].neighbours.push(this.vertices[i]);
            }
        }
    }
};