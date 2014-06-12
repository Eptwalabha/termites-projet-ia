function GeneticAlgorithm(woodHeaps, walls) {
    this.woodHeaps = woodHeaps;
    this.walls = walls;
    this.generation = [];
    this.graph = new Graph();
    this.makeRandomGeneration(20);
}

GeneticAlgorithm.prototype.makeRandomGeneration = function (nbrEntity) {

    for (var i = 0; i < nbrEntity; i++) {
        var graph = new Graph();
        graph.randomize(this.walls, {"width": 500, "height": 500});
        this.generation.push()
    }

};

GeneticAlgorithm.prototype.processGeneration = function() {

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

