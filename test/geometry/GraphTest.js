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

    "test a vertex can be added to a graph": function() {
        this.graph.addVertex(new Vertex(2, 3));
        var vertices = this.graph.vertices;
        assertEquals(1, vertices.length);
        assertEquals(2, vertices[0].x);
        assertEquals(3, vertices[0].y);
    },

    "test can connect two vertices together": function() {
        var vertexA = new Vertex(0, 1);
        var vertexB = new Vertex(2, 3);
        this.graph.vertices = [vertexA, vertexB];
        this.graph.setConnections([]);
        assertEquals(vertexB, vertexA.neighbours[0]);
        assertEquals(vertexA, vertexB.neighbours[0]);
    },

    "test can return true if segment intersects a wall": function() {
        var wall = new Wall();
        wall.setDimension(5, 10);
        assertTrue(doSegmentIntersectsWithWalls([[0, 10], [0, -10]], wall));
    }
});