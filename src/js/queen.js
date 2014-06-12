Queen.prototype = new Agent();
Queen.prototype.constructor = Queen;

function Queen(params) {
    Agent.call(this);
    this.typeId = "queen";
    this.boundingRadius = 3;

    this.expertSystem = new ExpertSystem();
    this.initExpertSystem();

    this.knownWoodHeaps = [];
    this.knownWalls = [];
    this.knownAgents = [];

    this.setPower(params.power);
	this.moveTo(params.x, params.y);
}

Queen.prototype.informNewAgent = function(agent) {
	
};

Queen.prototype.generateGraph = function() {
	
};

Queen.prototype.giveNewTask = function() {
	
};

Queen.prototype.setPower = function(power) {
	this.power = power;
};

Queen.prototype.getPower = function() {
	return this.power;
};

Queen.prototype.initExpertSystem = function() {
    // this.expertSystem.addRule("change_direction", ["timer_out"]);
    // this.expertSystem.addRule("change_direction", ["hit_wall"]);
    // this.expertSystem.addRule("change_direction", ["hit_heap"]);
    // this.expertSystem.addRule("drop_wood", ["hit_heap", "charged", "different_heap"]);
    // this.expertSystem.addRule("take_wood", ["hit_heap", "uncharged"]);
};

Queen.prototype.draw = function(context) {
    context.fillStyle = "blue";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, this.boundingRadius, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

Queen.prototype.update = function(dt) {

};