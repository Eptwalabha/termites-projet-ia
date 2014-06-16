function GeneticAlgorithm(woodHeaps, walls) {
    this.walls = walls;
    this.generation = 0;
    this.population = [];
    this.dimension = {width: 0, height: 0};
    this.graph = new Graph();
    this.fitnessThreshold = 0;
    this.populationSize = 10;
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
    return 0;
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

GeneticAlgorithm.prototype.generateRandomGraph = function(queen) {

    var knownWoodHeap = queen.knownWoodHeaps;
    var knownWalls = queen.knownWalls;

    var graph = new Graph();
    for (var i= 0; i < knownWoodHeap.length; ++i) {
        graph.vertices.push(new Vertex(knownWoodHeap[i].x, knownWoodHeap[i].y));
    }

    while (graph.vertices.length < 20) {
//        var vertex = new Vertex(Math.random() * canvasContext.width, Math.random() * canvasContext.height);
        var vertex = new Vertex(Math.random() * 600, Math.random() * 600);

        var collide = false;
        for (var j=0; j < knownWalls.length; ++j) {
            if (isPointInWall(vertex, knownWalls[j])) {
                collide = true;
                break;
            }
        }
        if (!collide) {
            graph.vertices.push(new Vertex())
        }
    }

    return graph;
};

GeneticAlgorithm.prototype.alterGraphDNA = function(graph, random) {

    if (random === undefined) {
        random = Math;
    }

    for (var i = 0, size = graph.vertices.length; i < size; i++) {
        if (random.random() > 0.1) {
            continue;
        }
        graph.vertices[i].x += (random.random() - 0.5) * 5;
        graph.vertices[i].y += (random.random() - 0.5) * 5;
    }

    if (Math.random() > 0.1) {
        graph.vertices.pop();
    }
};

GeneticAlgorithm.prototype.getAllPathsFrom = function(graph, origin) {

    var aStart = new AStar();
    aStart.vertices = graph.vertices;
    var paths = [];
    for (var i = 0, size = graph.vertices.length; i < size; ++i) {
        var path = aStart.getPathFromTo(origin, graph.vertices[i]);
        if (path.length > 0) {
            paths.push(path);
        }
    }
    return paths;
};

GeneticAlgorithm.prototype.getAveragePathLength = function(paths) {
    var sum = 0;
    for (var i = 0, size = paths.length; i < size; i++) {
        sum += getPathLength(paths[i]);
    }
    return sum / paths.length;
};

GeneticAlgorithm.prototype.computeGraphFitness = function(graph, origin) {

    var polygons = getPolygonsFromVertices(graph.vertices);
    var area = getVolumeOfBoundingBox(getBoundingBoxFromPolygon(polygons));
    var totalArea = this.dimension.width * this.dimension.height;
    var paths = this.getAllPathsFrom(graph, origin);
    var nbrPath = paths.length;
    var avgLength = this.getAveragePathLength(paths);
    var avgDelta = graph.getAverageDistanceFrom(origin);
    if (avgLength == 0 || totalArea == 0) {
        graph.fitness = 0;
    } else {
        console.log("nbrPath = " + nbrPath + "; (area / totalArea) = " + (area / totalArea) + "; (avgDelta / avgLength) = " + (avgDelta / avgLength) + ";");
        graph.fitness = (nbrPath * 100 + (area / totalArea) * 100) * (avgDelta / avgLength) * (nbrPath / graph.vertices.length);
    }
};