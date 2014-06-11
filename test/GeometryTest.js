GraphTest = TestCase("GeometryTest", {

    "setUp": function() {
    },

    "test a box can return a set of two vertices": function() {
        var wall = new Wall();
        wall.setDimension(10, 20);
        var vertex = getBoundingBoxFromWall(wall);
        assertEquals(4, vertex.length);
        assertEquals(-5, vertex[0].x);
        assertEquals(-10, vertex[0].y);
        assertEquals(5, vertex[2].x);
        assertEquals(10, vertex[2].y);
    },

    "test can tell if two sets of two vertices collide": function() {
        var setA = [new Vertex(0, 0), new Vertex(10, 10)];
        var setB = [new Vertex(5, 5), new Vertex(15, 15)];
        assertTrue(areTheseBoundingBoxesColliding(setA, setB));
    },

    "test can return true when a wall intersect a segment": function() {
        var edge = new Edge(new Vertex(0, 10), new Vertex(0, -10));
        var wall = new Wall(10, 1);
        assertTrue(doEdgeIntersectsWall(edge, wall));
    },

    "test can return false when a wall does not intersect a segment": function() {
        var edge = new Edge(new Vertex(11, 10), new Vertex(11, -10));
        var wall = new Wall(10, 1);
        assertTrue(doEdgeIntersectsWall(edge, wall));
    }
});