function AStar() {
    this.vertices = null;
    this.start = null;
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
    var deltaX = parent.x - children.x;
    var deltaY = parent.y - children.y;
    children.F = parent.G + Math.sqrt(deltaX * deltaX + deltaY * deltaY) + children.heuristic;
    children.parent = parent;
};