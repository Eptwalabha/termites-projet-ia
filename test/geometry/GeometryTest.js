GraphTest = TestCase("GeometryTest", {

    "setUp": function() {
    },

    "test a box can return a set of four vertices": function() {
        var wall = new Wall();
        wall.setDimension(10, 20);
        var vertices = getPolygonsFromWall(wall);
        assertEquals(4, vertices.length);
        assertEquals([-8, -13], vertices[0]);
        assertEquals([8, -13], vertices[1]);
        assertEquals([8, 13], vertices[2]);
        assertEquals([-8, 13], vertices[3]);
    },

    "test can return true if a point is in a wall": function () {
        var wall = new Wall();
        wall.setDimension(10, 10);
        assertTrue(isPointInWall([0, 0], wall));
    },

    "test can return true if two sets of two vertices collide": function() {
        var segmentA = [[0, 0], [10, 10]];
        var segmentB = [[10, 10], [15, 15]];
        assertTrue(areTheseBoundingBoxesColliding(segmentA, segmentB));
    },

    "test can return true when two segments intersect": function() {
        var segmentA = [[0, -10], [0, 10]];
        var segmentB = [[-10, 0], [10, 0]];
        assertTrue(doSegmentsIntersect(segmentA, segmentB));
    },

    "test can return false when two segments does not intersect": function() {
        var segmentA = [[0, 10], [0, -10]];
        var segmentB = [[10, 10], [10, -10]];
        assertFalse(doSegmentsIntersect(segmentA, segmentB));
    },

    "test can return true when two collinear segments intersect": function() {
        var segmentA = [[-10, 0], [10, 0]];
        var segmentB = [[10, 0], [-10, 0]];
        assertTrue(doSegmentsIntersect(segmentA, segmentB));
    },

    "test can return true when a segment intersects a wall": function() {
        var segment = [[0, 10], [0, -10]];
        var wall = new Wall();
        wall.setDimension(10, 2);
        assertTrue(doSegmentIntersectsWithWalls(segment, [wall]));
    },

    "test can return false when a segment does not intersect a wall": function() {
        var segment = [[20, 10], [20, -10]];
        var wall = new Wall();
        wall.setDimension(10, 2);
        assertFalse(doSegmentIntersectsWithWalls(segment, [wall]));
    },

    "test can determine a bounding box from an array of position": function() {
        var positions = [[-20, 10], [-15, 0], [10, -30]];
        assertEquals([[-20, -30], [10, 10]], getBoundingBoxFromPolygon(positions));
    },

    "test can return a volume from the bounding box of a polygon": function() {
        var positions = [[-20, 10], [-15, 0], [10, -30]];
        var boundingBox = getBoundingBoxFromPolygon(positions);
        assertEquals(30 * 40, getVolumeOfBoundingBox(boundingBox));
    },

    "test can return an array of positions from a set of vertices": function() {
        var vertexA = new Vertex(7, 5);
        var vertexB = new Vertex(5, 3);
        assertEquals([[7, 5], [5, 3]], getPolygonsFromVertices([vertexA, vertexB]));
    }
});