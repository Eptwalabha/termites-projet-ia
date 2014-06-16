MockRandom = function(pseudoRandom) {
    this.data = pseudoRandom;
    this.index = 0;
};

MockRandom.prototype.random = function() {
    return this.data[this.index++];
};

GraphTest = TestCase("GeneticAlgorithm", {

    "setUp": function () {
        this.mokeRandom =
        this.queen = new Queen({power: 10, x: 0, y: 0});
        this.genetic = new GeneticAlgorithm();
        this.graphA = new Graph();
        this.graphB = new Graph();
    },

    "test the dimension of a genetic world can be setup": function () {
        this.genetic.setWorldDimension(500, 600);
        assertEquals(500, this.genetic.dimension.width);
        assertEquals(600, this.genetic.dimension.height);
    },

    "test the fitness threshold can be setup": function() {
        this.genetic.setFitnessThreshold(0.9);
        assertEquals(0.9, this.genetic.fitnessThreshold);
    },

    "test a population is an array of graph": function() {
        this.genetic.addNewEntity();
        assertArray(this.genetic.population);
        assertTrue(this.genetic.population[0] instanceof Graph);
    },

    "test the population's size of a generation can be setup": function() {
        this.genetic.setPopulationSize(30);
        assertEquals(30, this.genetic.populationSize);
    },

    "test set known wood heaps as vertices when generating a new graph": function() {
        var woodHeapA = new WoodHeap();
        var woodHeapB = new WoodHeap();
        woodHeapA.moveTo(10, 20);
        woodHeapB.moveTo(100, 100);
        this.queen.knownWoodHeaps = [woodHeapA, woodHeapB];
        var graph = this.genetic.generateRandomGraph(this.queen);
        assertTrue(graph.hasVertex([woodHeapA.x, woodHeapA.y]));
        assertTrue(graph.hasVertex([woodHeapB.x, woodHeapB.y]));
    },

    "test a graph has 20 vertices when generating a new graph": function() {
        var graph = this.genetic.generateRandomGraph(this.queen);
        assertEquals(20, graph.vertices.length);
    },

    "test genetic algorithm can gives a fitness score to an entity": function() {
        var score = this.genetic.getFitnessScore(this.queen, this.graphA);
        assertNumber(score);
    },

    "test can apply mutation to graph": function() {
        var a = new Vertex(3, 5);
        var b = new Vertex(10, 0);
        this.graphA.vertices = [a, b];
        this.mokeRandom = new MockRandom([1, 0.01, 0.5, 0.1]);
        this.genetic.alterGraphDNA(this.graphA, this.mokeRandom);
        assertEquals([3, 5], [a.x, a.y]);
        assertEquals((10 + (0.5 - 0.5) * 5), b.x);
        assertEquals((0 + (0.1 - 0.5) * 5), b.y);
    },

    "test can compute every paths of the graph from the queen": function() {
        var a = new Vertex(0, 0);
        var b = new Vertex(10, 0);
        var c = new Vertex(0, 10);
        a.neighbours = [b, c];
        b.neighbours = [a, c];
        c.neighbours = [a, b];
        this.graphA.vertices = [a, b, c];
        var paths = this.genetic.getAllPathsFrom(this.graphA, a);
        assertEquals(3, paths.length);
    },

    "test can compute the average length of all paths": function() {
        var a = new Vertex(0, 0);
        var b = new Vertex(10, 0);
        var c = new Vertex(0, 10);
        a.neighbours = [b];
        b.neighbours = [a, c];
        c.neighbours = [b];
        this.graphA.vertices = [a, b, c];
        var paths = this.genetic.getAllPathsFrom(this.graphA, a);
        var averagePathLength = this.genetic.getAveragePathLength(paths);
        assertEquals((0 + 10 + 10 + Math.sqrt(10 * 10 + 10 * 10)) / 3, averagePathLength);
    },

    "test can compute the fitness of a graph": function() {
        var a = new Vertex(0, 0);
        var b = new Vertex(10, 0);
        var c = new Vertex(0, 10);
        a.neighbours = [b];
        b.neighbours = [a, c];
        c.neighbours = [b];
        this.graphA.vertices = [a, b, c];
        var area = 10 * 10;
        var totalArea = 300 * 300;
        var avg = (0 + 10 + 10 + Math.sqrt(10 * 10 + 10 * 10)) / 3;
        var avgDelta = (0 + 10 + 10) / 3;
        this.genetic.setWorldDimension(300, 300);
        this.genetic.computeGraphFitness(this.graphA, a);
        assertEquals((3 * 100 + (area / totalArea) * 100) * (avgDelta / avg) * (3 / 3), this.graphA.fitness);
    },

    "test a population can be sort by ascendant fitness": function() {},

    "test two entities of a population can be mixed to generate two new entities": function() {},

    "test sometime the less fitted entity is replace by a new and random one": function() {},

    "test a population can move to the next generation": function() {},

    "test can return the entity that reaches or surpasses the fitness threshold": function() {}
});