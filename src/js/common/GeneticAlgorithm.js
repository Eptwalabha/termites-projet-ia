function GeneticAlgorithm(woodHeaps, walls) {
    this.woodHeaps = woodHeaps;
    this.walls = walls;
    this.generation = 0;
    this.population = [];
    this.dimension = {width: 0, height: 0};
    this.graph = new Graph();
    this.fitnessThreshold = 0;
    this.populationSize = 10;
//    this.makeRandomGeneration(20);
}

GeneticAlgorithm.prototype.addNewEntity = function () {
    this.population.push(new Graph());
};

GeneticAlgorithm.prototype.makeRandomGeneration = function (nbrEntity) {
    for (var i = 0; i < nbrEntity; i++) {
        var graph = new Graph();
        graph.randomize(this.walls, {"width": 500, "height": 500});
        this.population.push()
    }
};

GeneticAlgorithm.prototype.setPopulationSize = function (populationSize) {
    this.populationSize = populationSize;
};

GeneticAlgorithm.prototype.processGeneration = function() {

};

GeneticAlgorithm.prototype.getFitnessScore = function(entity) {

    entity.fitness = {};
    var sumDelta = 0;
    var nbrEdges = entity.edges.length;

    entity.fitness.edge = nbrEdges / 400;

    if (nbrEdges == 0) {
        entity.fitness.averageDelta = 0;
        entity.fitness.total = 0;
        return;
    }

    for (var i = 0; i < nbrEdges; i++) {
        sumDelta += entity.edges[i].getSquareDist();
    }

    entity.fitness.averageDelta = sumDelta / nbrEdges;
    entity.fitness.total = 10;

};

GeneticAlgorithm.prototype.setWorldDimension = function(width, height) {
    this.dimension.width = width;
    this.dimension.height = height;
};

GeneticAlgorithm.prototype.setFitnessThreshold = function(fitnessThreshold) {
    this.fitnessThreshold = fitnessThreshold;
};

GeneticAlgorithm.prototype.combineGraph = function(graphA, graphB) {

    var adnA = graphA.vertices;
    var adnB = graphB.vertices;
    var newGraphA = new Graph();
    var newGraphB = new Graph();
    var pivot = Math.round((min(adnA.length, adnB.length) - 2) * Math.random()) + 1;

    for (var i = 0, size = max(adnA.length, adnB.length); i < size; i++) {
        if (i < pivot) {
            if (adnA.length < size) newGraphA.vertices.push(adnA[i]);
            if (adnB.length < size) newGraphB.vertices.push(adnB[i]);
        } else {
            if (adnB.length < size) newGraphA.vertices.push(adnB[i]);
            if (adnA.length < size) newGraphB.vertices.push(adnA[i]);
        }
    }

    return [newGraphA, newGraphB];
};

GeneticAlgorithm.prototype.alterGraphDNA = function(graph) {

    for (var i = 0, size = graph.vertices.length; i < size; i++) {
        if (Math.random() > 0.1) {
            continue;
        }
        graph.vertices[i].x += Math.random() * 5;
        graph.vertices[i].y += Math.random() * 5;
    }

    if (Math.random() > 0.1) {
        graph.vertices.pop();
    }
};

