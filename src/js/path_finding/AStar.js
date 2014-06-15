function AStar() {
    this.vertices = null;
    this.openList = [];
    this.closedList = [];
}

AStar.prototype.setHeuristic = function(vertex) {
    for (var i in this.vertices) {
        var deltaX = vertex.x - this.vertices[i].x;
        var deltaY = vertex.y - this.vertices[i].y;
        this.vertices[i].heuristic = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
};

AStar.prototype.getPath = function(start, end) {
    this.setHeuristic(end);

    this.openList = [start];
    start.F = start.heuristic;

    while (this.openList.length > 0) {
        var vertex = this.getNextVertexToCheck();
        if (vertex == end) {
            return this.rebuildPath(end);
        }
        this.moveFromOpenToClosedList(vertex);
        var neighbours = this.getVertexNeighbours(vertex);
        for (var i in neighbours) {
            var neighbor = neighbours[i];
            var F = this.computeF(vertex, neighbor);
            if (!this.isVertexInOpenList(neighbor) || neighbor.F == -1 || F < neighbor.F) {
                neighbor.F = F;
                neighbor.parent = vertex;
                if (!this.isVertexInOpenList(neighbor)) {
                    this.openList.push(neighbor);
                }
            }
        }
    }

    return [];
};

AStar.prototype.computeF = function(parent, children) {
    var deltaX = parent.x - children.x;
    var deltaY = parent.y - children.y;
    return parent.G + Math.sqrt(deltaX * deltaX + deltaY * deltaY) + children.heuristic;
};

AStar.prototype.isVertexInClosedList = function(vertex) {
    return this.closedList.indexOf(vertex) != -1;
};

AStar.prototype.isVertexInOpenList = function(vertex) {
    return this.openList.indexOf(vertex) != -1;
};

AStar.prototype.getVertexNeighbours = function(vertex) {
    var nextVerticesToCheck = [];

    for (var i in vertex.neighbours) {
        var neighbor = vertex.neighbours[i];
        if (!this.isVertexInClosedList(neighbor)) {
            nextVerticesToCheck.push(neighbor);
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

AStar.prototype.rebuildPath = function(vertex) {
    if (vertex === undefined) {
        return [];
    }
    if (vertex.parent === undefined || vertex.parent == null) {
        return [vertex];
    }
    var path = this.rebuildPath(vertex.parent);
    path.push(vertex);
    return path;
};

AStar.prototype.moveFromOpenToClosedList = function(vertex) {

    var index = this.openList.indexOf(vertex);
    if (index == -1) {
        return;
    }
    this.openList.splice(index, 1);
    this.closedList.push(vertex);
};