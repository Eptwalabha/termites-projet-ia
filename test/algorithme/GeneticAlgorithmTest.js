GraphTest = TestCase("GeneticAlgorithm", {

    "setUp": function () {
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

    "test genetic algorithm can gives a fitness score to an entity": function() {
        this.genetic.getFitnessScore(this.graphA);
        assertObject(this.graphA.fitness);
    },

    "test an entity with more edges than another has a better score": function() {
        this.graphA.edges = [new Edge(new Vertex(0,0), new Vertex(0,0))];
        this.graphB.edges = [];
        this.genetic.getFitnessScore(this.graphA);
        this.genetic.getFitnessScore(this.graphB);
        assertTrue(this.graphA.fitness.edge > this.graphB.fitness.edge);
    },

    "test an entity with the higher delta between vertices has a better score": function() {
        this.graphA.edges = [new Edge(new Vertex(0,0), new Vertex(100,100))];
        this.graphB.edges = [new Edge(new Vertex(0,0), new Vertex(10,10))];
        this.genetic.getFitnessScore(this.graphA);
        this.genetic.getFitnessScore(this.graphB);
        assertTrue(this.graphA.fitness.averageDelta > this.graphB.fitness.averageDelta);
    },

    "test a general score can be determine from fitness score": function() {
        this.graphA.edges = [new Edge(new Vertex(0,0), new Vertex(100,100)), new Edge(new Vertex(0,0), new Vertex(10,10))];
        this.graphB.edges = [new Edge(new Vertex(0,0), new Vertex(100,100))];
        this.genetic.getFitnessScore(this.graphA);
        this.genetic.getFitnessScore(this.graphB);
        assertTrue(this.graphA.fitness.total > this.graphB.fitness.total);
    },

    "test a population can be sort by ascendant fitness": function() {},

    "test two entities of a population can be mixed to generate two new entities": function() {},

    "test an entity can mutates": function() {},

    "test sometime the less fitted entity is replace by a new and random one": function() {},

    "test a population can move to the next generation": function() {},

    "test can return the entity that reaches or surpasses the fitness threshold": function() {}
});