Vertex = function(x, y){
    this.x = x;
    this.y = y;
    this.neighbourgs = [];
    this.heuristic = null;
    this.parent = null;
    this.G = 0;
    this.F = 0;
};

Vertex.prototype.setPosition = function (x, y){
    this.x = x;
    this.y = y;
};