Pheromone.prototype = new Agent();
Pheromone.prototype.constructor = Pheromone;

function Pheromone(cariing, power, timeToLive) {
	Agent.call(this);
	this.typeId = cariing ? "pheromone_heap" : "pheromone_nest";

    this.collideTypes = ["wood_heap"];
    this.contactTypes = [];

    this.initialTTL = timeToLive;
    this.timeToLive = timeToLive;
    this.boundingRadius = 30;
    this.power = power;
    this.color = cariing ? "0, 255, 0" : "0, 0, 255";
}

Pheromone.prototype.update = function(dt) {

    this.timeToLive -= dt;
    if (this.timeToLive <= 0)
        this.dead = true;
};

Pheromone.prototype.draw = function(context) {

//    context.fillStyle = "rgba(" + this.color + ", " + (this.timeToLive / (this.initialTTL * 3)) + ")";
//    context.strokeStyle= (this.typeId == "pheromone_heap") ? "#0f0" : "#00f";
    context.strokeStyle= "rgba(" + this.color + ", " + (this.timeToLive / this.initialTTL) + ")";
    context.beginPath();
    context.arc(this.x, this.y, 1, 0, 2*Math.PI);
//    context.fill();
    context.stroke();

//    context.fillStyle="rgba(0, 0, 0, 1)";
//    context.strokeStyle="#000";
//    context.beginPath();
//    context.fillText("" + this.power, this.x, this.y);
//    context.stroke();
};

Pheromone.prototype.processCollision = function(collidedAgent) {


};

Pheromone.prototype.processPerception = function(perceivedAgent) {
};
