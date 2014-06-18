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
    this.vertex = new Vertex(params.x, params.y);
}

Queen.prototype.informNewAgent = function(agent) {
    this.knownAgents[agent.id] = agent;
};

Queen.prototype.updateGraphAndStrategy = function () {
    this.generateGraph();
    this.updateStrategy();
};

Queen.prototype.generateGraph = function() {

};

Queen.prototype.updateStrategy = function () {

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
    // Une reine qui reçoit de nouvelles informations va mettre à jour
    // son graphe de déplacement et modifier la stratégie de sa termitière.
    this.expertSystem.addRule("update_graph_and_strategy", ["meet_termite", "new_wood_heap_or_new_wall"]);

    // Une reine qui reçoit une demande de travail, va se charger de fournir au demandeur d’emploi une destination
    // (correspondant à une zone à explorer ou un tas de bois à collecter).
    this.expertSystem.addRule("give_new_task", ["meet_termite","termite_asked_for_work"]);
};
Queen.prototype.analyze = function() {
    return this.expertSystem.inferForward();
};
Queen.prototype.act = function(conclusions) {
    for(var i=0; i < conclusions.length; ++i ) {
        if(conclusions[i] == "update_graph_and_strategy") {
            this.updateGraphAndStrategy();
        }

        else if(conclusions[i] == "give_new_task") {
            this.giveNewTask();
        }
    }
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