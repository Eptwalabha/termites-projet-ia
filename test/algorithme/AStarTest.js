GraphTest = TestCase("A *", {

    "setUp": function () {
        this.vertexA = new Vertex(0, 0);
        this.vertexB = new Vertex(10, 10);
        this.aStar = new AStar();
    },

    "test a vertex contains a list of vertices when a graph is calculated": function() {

        this.vertexA = new Vertex(0, 0);
        assertArray(this.vertexA.neighbourgs);
    },

    "test a vertex knows its neighbours": function() {
        var graph = new Graph();
        graph.vertices = [this.vertexA, this.vertexB];
        graph.setConnections([]);
        assertEquals(1, this.vertexA.neighbourgs.length);
        assertEquals(1, this.vertexB.neighbourgs.length);
        assertEquals(this.vertexA, this.vertexB.neighbourgs[0]);
        assertEquals(this.vertexB, this.vertexA.neighbourgs[0]);
    },

    "test A* can gives heuristic value to a vertex": function() {
        this.aStar.vertices = [this.vertexA, this.vertexB];
        this.aStar.setHeuristic(new Vertex(10, 10));
        assertEquals(Math.sqrt(10 * 10 + 10 * 10), this.vertexA.heuristic);
        assertEquals(0, this.vertexB.heuristic);
    },

    "test a path is an array of vertices": function() {
        var path = this.aStar.getPath(this.vertexA, this.vertexB);
        assertArray(path);
    },

    "test A* returns an empty array when there is not possible path": function() {
        this.vertexA.neighbourgs = [];
        this.aStar.vertices = [this.vertexA, this.vertexB];
        var path = this.aStar.getPath(this.vertexA, this.vertexB);
        assertEquals(0, path.length);
    },

    "test A* calculate heuristics before calculate path": function() {
        this.aStar.vertices = [this.vertexA, this.vertexB];
        this.aStar.getPath(this.vertexA, this.vertexB);
        assertEquals(Math.sqrt(10 * 10 + 10 * 10), this.vertexA.heuristic);
        assertEquals(0, this.vertexB.heuristic);
    },

    "test A* can calculate F between two vertices": function() {
        this.vertexA.setPosition(0, 0);
        this.vertexB.setPosition(3, 0);
        this.vertexA.G = 1;
        this.vertexB.heuristic = 20;
        this.aStar.calculateF(this.vertexA, this.vertexB);
        assertEquals(((1 + 3) + 20), this.vertexB.F);
    },

    "test A* set the parent when calculate F": function() {
        this.aStar.calculateF(this.vertexA, this.vertexB);
        assertEquals(this.vertexA, this.vertexB.parent);
    },

    "test A* can return a path from point A to point B": function() {
        this.vertexA.neighbourgs = [this.vertexB];
        this.vertexB.neighbourgs = [this.vertexA];
        this.aStar.vertices = [this.vertexA, this.vertexB];
        var path = this.aStar.getPath(this.vertexA, this.vertexB);
//        assertEquals(this.vertexA, path[0]);
//        assertEquals(this.vertexB, path[1]);
    }
});