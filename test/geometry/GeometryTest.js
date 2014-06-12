GraphTest = TestCase("GeometryTest", {

    "setUp": function() {
    },

    "test a box can return a set of four vertices": function() {
        var wall = new Wall();
        wall.setDimension(10, 20);
        var vertex = getBoundingBoxFromWall(wall);
        assertEquals(4, vertex.length);
        assertEquals(-5 - 3, vertex[0].x);
        assertEquals(-10 - 3, vertex[0].y);
        assertEquals(5 + 3, vertex[2].x);
        assertEquals(10 + 3, vertex[2].y);
    },

    "test can return true if two sets of two vertices collide": function() {
        var setA = [new Vertex(0, 0), new Vertex(10, 10)];
        var setB = [new Vertex(5, 5), new Vertex(15, 15)];
        assertTrue(areTheseBoundingBoxesColliding(setA, setB));
    },

    "test can return true when two segments intersect": function() {
        var horizon = new Edge(new Vertex(0, 10), new Vertex(0, -10));
        var vertical = new Edge(new Vertex(-10, 0), new Vertex(10, 0));
        assertTrue(doEdgesIntersect(horizon, vertical));
    },

    "test can return false when two segments does not intersect": function() {
        var edgeA = new Edge(new Vertex(0, 10), new Vertex(0, -10));
        var edgeB = new Edge(new Vertex(10, 10), new Vertex(10, -10));
        assertFalse(doEdgesIntersect(edgeA, edgeB));
    },

    "test can return true when two collinear segments intersect": function() {
        var edgeA = new Edge(new Vertex(-10, 0), new Vertex(10, 0));
        var edgeB = new Edge(new Vertex(10, 0), new Vertex(-10, 0));
        assertTrue(doEdgesIntersect(edgeA, edgeB));
    },

    "test can return true when a segment intersects a wall": function() {
        var edge = new Edge(new Vertex(0, 10), new Vertex(0, -10));
        var wall = new Wall();
        wall.setDimension(10, 2);
        assertTrue(doEdgeIntersectsWall(edge, wall));
    },

    "test can return false when a segment does not intersect a wall": function() {
        var edge = new Edge(new Vertex(20, 10), new Vertex(20, -10));
        var wall = new Wall();
        wall.setDimension(10, 2);
        assertFalse(doEdgeIntersectsWall(edge, wall));
    }
});