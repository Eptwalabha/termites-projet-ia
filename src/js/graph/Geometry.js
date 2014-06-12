var getBoundingBoxFromWall = function(wall) {
    var halfWidth = wall.boundingWidth / 2 + 3;
    var halfHeight = wall.boundingHeight / 2 + 3;
    var bottomLeft = new Vertex(wall.x - halfWidth, wall.y - halfHeight);
    var bottomRight = new Vertex(wall.x + halfWidth, wall.y - halfHeight);
    var topRight = new Vertex(wall.x + halfWidth, wall.y + halfHeight);
    var topLeft = new Vertex(wall.x - halfWidth, wall.y + halfHeight);
    return [bottomLeft, bottomRight, topRight, topLeft];
};

var getBoundingBoxFromEdge = function(edge) {
    var bottomLeft = new Vertex(min(edge.a.x, edge.b.x), min(edge.a.y, edge.b.y));
    var topRight = new Vertex(max(edge.a.x, edge.b.x), max(edge.a.y, edge.b.y));
    return [bottomLeft, topRight];
};

var max = function (a, b) {
    return (a > b) ? a : b;
};

var min = function (a, b) {
    return (a < b) ? a : b;
};

var isPointInWall = function(vertex, wall) {
    var box = getBoundingBoxFromWall(wall);
    return vertex.x >= box[0].x && vertex.x <= box[2].x &&
        vertex.y >= box[0].y && vertex.y <= box[2].y;
};

var areTheseBoundingBoxesColliding = function(boundingBoxA, boundingBoxB) {
    return boundingBoxA[1].x >= boundingBoxB[0].x && boundingBoxA[0].x <= boundingBoxB[1].x &&
        boundingBoxA[1].y >= boundingBoxB[0].y && boundingBoxA[0].y <= boundingBoxB[1].y;
};

var lineSegmentTouchesOrCrossesLine = function(edgeA, edgeB) {
    var temp = isPointRightOfLine(edgeA, edgeB.b);
    return isPointOnLine(edgeA, edgeB.a) || isPointOnLine(edgeA, edgeB.b) || (isPointRightOfLine(edgeA, edgeB.a) ? !temp : temp);
};

var doEdgeIntersectsWall = function(edge, wall) {
    var boxWall = getBoundingBoxFromWall(wall);
    var bottom = new Edge(boxWall[0], boxWall[1]);
    var right = new Edge(boxWall[1], boxWall[2]);
    var top = new Edge(boxWall[2], boxWall[3]);
    var left = new Edge(boxWall[3], boxWall[0]);

    return doEdgesIntersect(edge, bottom) || doEdgesIntersect(edge, right) ||
        doEdgesIntersect(edge, top) || doEdgesIntersect(edge, left);
};

var doEdgesIntersect = function(edgeA, edgeB) {
    var boxA = getBoundingBoxFromEdge(edgeA);
    var boxB = getBoundingBoxFromEdge(edgeB);

    return areTheseBoundingBoxesColliding(boxA, boxB)
        && lineSegmentTouchesOrCrossesLine(edgeA, edgeB)
        && lineSegmentTouchesOrCrossesLine(edgeB, edgeA);
};

var isPointOnLine = function(edge, vertex) {
    var aTmp = new Vertex(edge.b.x - edge.a.x, edge.b.y - edge.a.y);
    var bTmp = new Vertex(vertex.x - edge.a.x, vertex.y - edge.a.y);
    var r = crossProduct(aTmp, bTmp);
    return Math.abs(r) < 0.000001;
};

var isPointRightOfLine = function(edge, b) {
    var aTmp = new Vertex(edge.b.x - edge.a.x, edge.b.y - edge.a.y);
    var bTmp = new Vertex(b.x - edge.a.x, b.y - edge.a.y);
    return crossProduct(aTmp, bTmp) < 0;
};

var crossProduct = function(a, b) {
    return a.x * b.y - b.x * a.y;
};
