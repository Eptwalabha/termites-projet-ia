GraphTest = TestCase("GraphTest", {

    "setUp": function() {
        this.graph = new Graph();
    },

    "test a graph has an array of vertices": function() {
        assertTrue(this.graph.vertices instanceof Array);
    },

    "test a vertex is a set of two coordinates": function() {
        var vertex = new Vertex(2, 5);
        assertEquals(2, vertex.x);
        assertEquals(5, vertex.y);
    },

    "test an edge is a set of two vertices": function() {
        var edge = new Edge(new Vertex(0, 1), new Vertex(2, 3));
        assertTrue(edge.a instanceof Vertex);
        assertTrue(edge.b instanceof Vertex);
    },

    "test a vertex can be added to a graph": function() {
        this.graph.addVertex(new Vertex(2, 3));
        var vertices = this.graph.vertices;
        assertEquals(1, vertices.length);
        assertEquals(2, vertices[0].x);
        assertEquals(3, vertices[0].y);
    },

    "test two vertices can generate an edge": function() {
        var vertexA = new Vertex(0, 1);
        var vertexB = new Vertex(2, 3);
        this.graph.vertices = [vertexA, vertexB];
        this.graph.generateEdges();
        assertEquals(1, this.graph.edges.length);
        assertEquals(vertexA, this.graph.edges[0].a);
        assertEquals(vertexB, this.graph.edges[0].b);
    },

    "test a wall intersect a segment": function() {
        var vertexA = new Vertex(0, 10);
        var vertexB = new Vertex(0, 10);
        var wall = new Wall();
        wall.setDimension(5, 10);

    },

    "test don't generate an edge who intersects a wall": function() {
//        var wall = new Wall();
//        wall.setDimension(5, 10);
//        wall.moveTo(0, 0);
//        this.graph.wallList = [wall];
//        this.graph.vertices = [new Vertex(0, 10), new Vertex(0, -10)]
//        this.graph.generateEdges();
//        assertEquals(0, this.graph.edges.length);
    }

});