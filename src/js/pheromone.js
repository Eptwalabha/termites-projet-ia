Pheromone.prototype = new Agent();
Pheromone.prototype.constructor = Pheromone;

function Pheromone(queen) {
	Agent.call(this);
    this.setQueen(queen);
}

Pheromone.prototype.setQueen = function(queen) {
    this.queen = queen;
};

Pheromone.prototype.getQueen = function() {
    return this.queen;
};

Pheromone.prototype.update = function(dt) {
};

Pheromone.prototype.draw = function(context) {
};