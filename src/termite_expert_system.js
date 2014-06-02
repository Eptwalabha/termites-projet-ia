Termite.prototype = new Agent();
Termite.prototype.constructor = Termite;

function Termite() {
    Agent.call(this);
    this.typeId = "termite";
    this.boundingRadius = 3;
    this.perceptionRadius = 30;

    this.collideTypes = ["wood_heap"];
    this.contactTypes = ["wood_heap", "termite"];

    this.nextChange = 0;
    this.speed = 0;
    this.expertSystem = new ExpertSystem();
    this.initExpertSystem();
    this.takeARandomDirection();
    this.hit_wall = false;
    this.cariingWood = false;
}

Termite.prototype.initExpertSystem = function() {
//    this.expertSystem = new ExpertSystem();

//	this.expertSystem.addRule("goal", ["premise1", "premise2"]);
    this.expertSystem.addRule("change_direction", ["timer_out"]);
    this.expertSystem.addRule("change_direction", ["hit_wall"]);
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
};

Termite.prototype.perceive = function() {

    this.expertSystem.resetFactValues();
    this.expertSystem.setFactValid("timer_out", (this.nextChange <= 0));
    this.expertSystem.setFactValid("hit_wall", this.hit_wall);
};

Termite.prototype.analyze = function() {

    return this.expertSystem.inferForward();
};

Termite.prototype.act = function(conclusions) {

    console.log(conclusions);

    for (var conclusion in conclusions) {
        if (conclusion == "drop_wood") {
            this.dropWood();
        } else if (conclusions == "change_direction") {
            this.takeARandomDirection();
        }
    }
};

Termite.prototype.draw = function(context) {
    context.fillStyle = this.cariingWood ? "rgba(255, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, 2, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

Termite.prototype.processCollision = function(collidedAgent) {

    if (collidedAgent == null) {
        this.hit_wall = true;
        return;
    }
};

Termite.prototype.processPerception = function(perceivedAgent) {
};
