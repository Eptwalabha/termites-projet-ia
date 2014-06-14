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
        assertEquals(Math.sqrt(10 * 10 + 10 * 10), this.vertexA.heuristic);
        assertEquals(0, this.vertexB.heuristic);
    },

    "test a path is an array of vertices": function() {
        var path = this.aStar.getPath(this.vertexA, this.vertexB);
        assertArray(path);
    },

    "test A* returns an empty array when there is not possible path": function() {
        this.vertexA.neighbours = [];
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

    "test a vertex can changes its parent and its score if it gets better": function() {
        this.vertexB.parent = null;
        this.vertexB.F = 9001;
        this.vertexB.heuristic = 20;
        this.vertexA.G = 1;
        this.aStar.calculateF(this.vertexA, this.vertexB);
        assertEquals(this.vertexA, this.vertexB.parent);
    },

    "test a vertex does not change its parent nor its score if the new score is worth": function() {
        var parent = new Vertex(0, 0);
        this.vertexB.parent = parent;
        this.vertexB.F = 1;
        this.vertexB.heuristic = 1;
        this.vertexA.G = 9001;
        this.aStar.calculateF(this.vertexA, this.vertexB);
        assertNotEquals(this.vertexA, this.vertexB.parent);
        assertEquals(parent, this.vertexB.parent);
        assertEquals(1, this.vertexB.F);
    },

    "test neighbours of a vertex go in the open list when the vertex is checked": function() {
        this.vertexA.neighbours = [this.vertexB];
        this.aStar.calculateF(new Vertex(0, 0), this.vertexA);
        assertEquals(1, this.aStar.openList.length);
    },

    "test a vertex already in the closed list is not added to the open list": function() {
        this.vertexA.neighbours = [this.vertexB];
        this.aStar.closedList = [this.vertexB];
        this.aStar.calculateF(new Vertex(0, 0), this.vertexA);
        assertEquals(0, this.aStar.openList.length);
    },

    "test A* can retrieves all the neighbours of a vertex": function() {
        this.vertexB.neighbours = [this.vertexA];
        var neighbours = this.aStar.getNextVerticesToCheck(this.vertexB);
        assertArray(neighbours);
        assertEquals(this.vertexA, neighbours[0]);
    },

    "test A* selects the next best vertex to check in the open list": function() {
        this.vertexA.F = 20;
        this.vertexB.F = 10;
        var vertexC = new Vertex(0, 0);
        vertexC.F = 1;
        this.aStar.openList = [this.vertexA, this.vertexB, vertexC];
        assertEquals(vertexC, this.aStar.getNextVertexToCheck());
    },

    "test A* omits vertices that are already in the closed list when it retrieves neighbours": function() {
        this.aStar.closedList = [this.vertexA];
        this.vertexB.neighbours = [this.vertexA];
        assertEquals([], this.aStar.getNextVerticesToCheck(this.vertexB));
    },

    "test A* can return a path from point A to point B": function() {
        var vertexC = new Vertex(10, 10);
        this.vertexA.neighbours = [this.vertexB];
        this.vertexB.neighbours = [vertexC];
        this.aStar.vertices = [this.vertexA, this.vertexB, vertexC];
        var path = this.aStar.getPath(this.vertexA, vertexC);
//        assertEquals(this.vertexA, path[0]);
//        assertEquals(this.vertexB, path[1]);
//        assertEquals(this.vertexC, path[2]);
    }
});