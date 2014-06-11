Termite.prototype = new Agent();
Termite.prototype.constructor = Termite;

function Termite() {
    Agent.call(this);
    this.typeId = "termite";
    this.boundingRadius = 3;
    this.perceptionRadius = 30;

    this.collideTypes = ["wood_heap", "wall"];
    this.contactTypes = ["wood_heap", "termite"];

    this.nextChange = 0;
    this.speed = 0;
    this.expertSystem = new ExpertSystem();
    this.initExpertSystem();
    this.takeARandomDirection();
    this.cariingWood = false;
    this.last_hit_type = "";
    this.lastWoodHeap = null;
    this.lastPickUpHeap = null;
}

Termite.prototype.initExpertSystem = function() {
//    this.expertSystem = new ExpertSystem();

//	this.expertSystem.addRule("goal", ["premise1", "premise2"]);
    this.expertSystem.addRule("change_direction", ["timer_out"]);
    this.expertSystem.addRule("change_direction", ["hit_wall"]);
    this.expertSystem.addRule("change_direction", ["hit_heap"]);
    this.expertSystem.addRule("drop_wood", ["hit_heap", "charged", "different_heap"]);
    this.expertSystem.addRule("take_wood", ["hit_heap", "uncharged"]);
};

Termite.prototype.takeARandomDirection = function () {

    this.destination = {
        x : Math.random() * 200 - 100,
        y : Math.random() * 200 - 100
    };

    this.speed = Math.random() * 150 + 150;
    this.nextChange = Math.random() * 800 + 200
};

Termite.prototype.update = function(dt) {

    this.perceive();

    var conclusions = this.analyze();
    this.act(conclusions);

    this.hit_wall = false;
    this.moveBy(this.destination, this.speed * dt / 1000);
    this.nextChange -= dt;
    this.last_hit_type = "";
    this.lastWoodHeap = null;
};

Termite.prototype.perceive = function() {

    this.expertSystem.resetFactValues();
    this.expertSystem.setFactValid("timer_out", (this.nextChange <= 0));
    this.expertSystem.setFactValid("hit_wall", this.last_hit_type == "wall");
    this.expertSystem.setFactValid("hit_heap", this.last_hit_type == "wood_heap");
    this.expertSystem.setFactValid("charged", this.cariingWood);
    this.expertSystem.setFactValid("uncharged", !this.cariingWood);
    this.expertSystem.setFactValid("different_heap", this.lastWoodHeap != this.lastPickUpHeap || this.lastPickUpHeap == null);
};

Termite.prototype.analyze = function() {

    return this.expertSystem.inferForward();
};

Termite.prototype.act = function(conclusions) {

    for (var i = 0, size = conclusions.length; i < size; i++) {
        if (conclusions[i] == "change_direction") {
            this.takeARandomDirection();
        } else if (conclusions[i] == "drop_wood") {
            this.lastWoodHeap.addWood();
            this.cariingWood = false;
            this.lastPickUpHeap = this.lastWoodHeap;
        } else if (conclusions[i] == "take_wood") {
            this.lastWoodHeap.takeWood();
            this.cariingWood = true;
        }
    }
};

Termite.prototype.draw = function(context) {
    context.fillStyle = this.cariingWood ? "rgba(255, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, this.boundingRadius, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

Termite.prototype.processCollision = function(collidedAgent) {

    if (collidedAgent == null) {
        this.last_hit_type = "wall";
        return;
    }

    this.last_hit_type = collidedAgent.typeId;

    if (this.last_hit_type == "wood_heap") {
        this.lastWoodHeap = collidedAgent;
    }
};

Termite.prototype.processPerception = function(perceivedAgent) {
};
