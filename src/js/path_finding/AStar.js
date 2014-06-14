function AStar() {
    this.vertices = null;
    this.start = null;
    this.openList = [];
    this.closedList = [];
}

AStar.prototype.setup = function(vertices, start) {
    this.vertices = vertices;
    this.start = start;
};

AStar.prototype.setHeuristic = function(vertex) {
    for (var i in this.vertices) {
        var deltaX = vertex.x - this.vertices[i].x;
        var deltaY = vertex.y - this.vertices[i].y;
        this.vertices[i].heuristic = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
};

AStar.prototype.getPath = function(start, end) {
    this.setHeuristic(end);
    return [];
};

AStar.prototype.calculateF = function(parent, children) {

    for (var i in children.neighbours) {
        if (!this.isVertexInClosedList(children.neighbours[i])) {
            this.openList.push(children.neighbours[i]);
        }
    }

    var deltaX = parent.x - children.x;
    var deltaY = parent.y - children.y;

    var newF = parent.G + Math.sqrt(deltaX * deltaX + deltaY * deltaY) + children.heuristic;

    if (children.F == -1 || children.F > newF) {
        children.F = newF;
        children.parent = parent;
    }
};

AStar.prototype.isVertexInClosedList = function(vertex) {
    return this.closedList.indexOf(vertex) != -1;
};

AStar.prototype.getNextVerticesToCheck = function(vertex) {
    var nextVerticesToCheck = [];

    for (var i in vertex.neighbours) {
        if (!this.isVertexInClosedList(vertex.neighbours[i])) {
            nextVerticesToCheck.push(vertex.neighbours[i]);
        }
    }
    return nextVerticesToCheck;
};

AStar.prototype.getNextVertexToCheck = function() {
    if (this.openList.length == 0) {
        return null;
    }

    var lowerScore = this.openList[0].F;
    var index = 0;

    for (var i in this.openList) {
        var score = this.openList[i].F;
        if (score < lowerScore) {
            lowerScore = score;
            index = i;
        }
    }

    return this.openList[index];
};