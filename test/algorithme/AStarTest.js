GraphTest = TestCase("A *", {

    "setUp": function () {
        this.vertexA = new Vertex(0, 0);
        this.vertexB = new Vertex(10, 10);
        this.aStar = new AStar();
    },

    "test a vertex contains a list of vertices when a graph is calculated": function() {

        this.vertexA = new Vertex(0, 0);
        assertArray(this.vertexA.neighbours);
    },

    "test a vertex knows its neighbours": function() {
        var graph = new Graph();
        graph.vertices = [this.vertexA, this.vertexB];
        graph.setConnections([]);
        assertEquals(1, this.vertexA.neighbours.length);
        assertEquals(1, this.vertexB.neighbours.length);
        assertEquals(this.vertexA, this.vertexB.neighbours[0]);
        assertEquals(this.vertexB, this.vertexA.neighbours[0]);
    },

    "test A* can gives heuristic value to a vertex": function() {
        this.aStar.vertices = [this.vertexA, this.vertexB];
        this.aStar.setHeuristic(new Vertex(10, 10));
        assertEquals((10 + 10), this.vertexA.heuristic);
        assertEquals(0, this.vertexB.heuristic);
    },

    "test a path is an array of vertices": function() {
        var path = this.aStar.getPathFromTo(this.vertexA, this.vertexB);
        assertArray(path);
    },

    "test A* returns an empty array when there is not possible path": function() {
        this.vertexA.neighbours = [];
        this.aStar.vertices = [this.vertexA, this.vertexB];
        var path = this.aStar.getPathFromTo(this.vertexA, this.vertexB);
        assertEquals(0, path.length);
    },

    "test A* calculate heuristics before calculate path": function() {
        this.aStar.vertices = [this.vertexA, this.vertexB];
        this.aStar.getPathFromTo(this.vertexA, this.vertexB);
        assertEquals(10 + 10, this.vertexA.heuristic);
        assertEquals(0, this.vertexB.heuristic);
    },

    "test A* can calculate G between two vertices": function() {
        this.vertexA.setPosition(0, 0);
        this.vertexB.setPosition(3, 0);
        this.vertexA.G = 1;
        var G = this.aStar.computeG(this.vertexA, this.vertexB);
        assertEquals((1 + 3), G);
    },

    "test A* can retrieves all the neighbours of a vertex": function() {
        this.vertexB.neighbours = [this.vertexA];
        var neighbours = this.aStar.getVertexNeighbours(this.vertexB);
        assertArray(neighbours);
        assertEquals(this.vertexA, neighbours[0]);
    },

    "test A* selects the next best vertex to check from the open list": function() {
        this.vertexA.F = 20;
        this.vertexB.F = 10;
        var vertexC = new Vertex(0, 0);
        vertexC.F = 1;
        this.aStar.openList = [this.vertexA, this.vertexB, vertexC];
        assertEquals(vertexC, this.aStar.getNextVertexToCheck());
    },

    "test A* can moves a vertex from the open list to the closed list": function() {
        this.aStar.openList = [new Vertex(0, 1), this.vertexA, this.vertexB];
        this.aStar.closedList = [];
        this.aStar.moveFromOpenToClosedList(this.vertexA);
        assertEquals(1, this.aStar.closedList.length);
        assertEquals(this.vertexA, this.aStar.closedList[0]);
        assertEquals(2, this.aStar.openList.length);
        assertEquals(-1, this.aStar.openList.indexOf(this.vertexA));
    },

    "test A* omits vertices that are already in the closed list when it retrieves neighbours": function() {
        this.aStar.closedList = [this.vertexA];
        this.vertexB.neighbours = [this.vertexA];
        assertEquals([], this.aStar.getVertexNeighbours(this.vertexB));
    },

    "test A* returns null when the open list is empty (no path)": function() {
        this.aStar.openList = [];
        assertNull(this.aStar.getNextVertexToCheck());
    },

    "test A* can rebuild the path": function() {
        var vertexC = new Vertex(10, 10);
        this.vertexA.parent = null;
        this.vertexB.parent = this.vertexA;
        vertexC.parent = this.vertexB;

        var path = this.aStar.rebuildPath(vertexC);
        assertEquals(this.vertexA, path[0]);
        assertEquals(this.vertexB, path[1]);
        assertEquals(vertexC, path[2]);
    },

    "test A* can return a path from point A to point B": function() {
        var vertexC = new Vertex(10, 10);
        this.vertexA.neighbours = [this.vertexB];
        this.vertexB.neighbours = [vertexC];
        this.aStar.vertices = [this.vertexA, this.vertexB, vertexC];
        var path = this.aStar.getPathFromTo(this.vertexA, vertexC);
        assertEquals(this.vertexA, path[0]);
        assertEquals(this.vertexB, path[1]);
        assertEquals(vertexC, path[2]);
    },

    "test A* works with real situation": function() {

        var a = new Vertex(4, 9);
        var b = new Vertex(4, 5);
        var c = new Vertex(8, 7);
        var d = new Vertex(8, 2);
        var e = new Vertex(6, 3);
        var f = new Vertex(2, 1);

        a.neighbours = [b, c];
        b.neighbours = [a, f];
        c.neighbours = [a, d, e];
        d.neighbours = [e, c, f];
        e.neighbours = [c, d];
        f.neighbours = [b, d];

        this.aStar.vertices = [a, b, c, d, e, f];

        var path = this.aStar.getPathFromTo(b, e);

        assertEquals(b, path[0]);
        assertEquals(f, path[1]);
        assertEquals(d, path[2]);
        assertEquals(e, path[3]);
    },


    "test A* select the shortest path": function() {

        var a = new Vertex(0, 0);
        var b = new Vertex(50, 50);
        var c = new Vertex(25, 0);
        var d = new Vertex(50, 0);
        var e = new Vertex(75, 0);
        var f = new Vertex(100, 0);

        a.neighbours = [b, c];
        b.neighbours = [a, e];
        c.neighbours = [a, d];
        d.neighbours = [c, e];
        e.neighbours = [d, f];
        f.neighbours = [b, a];

        this.aStar.vertices = [a, b, c, d, e, f];

        var path = this.aStar.getPathFromTo(a, f);

        assertEquals(a, path[0]);
        assertEquals(c, path[1]);
        assertEquals(d, path[2]);
        assertEquals(e, path[3]);
        assertEquals(f, path[4]);
    },

    "test a path already computed does not need to be compute again": function() {

        var a = new Vertex(0, 0);
        var b = new Vertex(50, 50);
        var c = new Vertex(25, 0);

        a.neighbours = [b];
        b.neighbours = [a, c];
        c.neighbours = [b];

        var graph = new Graph();
        graph.vertices = [a, b, c];

        this.aStar.setGraph(graph);
        var path = this.aStar.getPathFromTo(a, c);
        assertEquals(1, graph.paths.length);
        assertEquals(path, graph.getPathFromTo(a, c));
    }
});