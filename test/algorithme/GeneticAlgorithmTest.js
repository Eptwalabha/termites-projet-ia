GraphTest = TestCase("GeneticAlgorithm", {

    "setUp": function () {
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

    "test a population can be sort by ascendant fitness": function() {},

    "test two entities of a population can be mixed to generate two new entities": function() {},

    "test an entity can mutates": function() {},

    "test sometime the less fitted entity is replace by a new and random one": function() {},

    "test a population can move to the next generation": function() {},

    "test can return the entity that reaches or surpasses the fitness threshold": function() {}
});