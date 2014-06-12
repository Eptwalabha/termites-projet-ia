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

    this.caryingWood = false;
    this.last_hit_type = "";
    this.lastWoodHeap = null;
    this.lastPickUpHeap = null;

    this.queen = null;
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
        x : this.last_hit_type == "wall" ? -1 * this.destination.x + 10 : Math.random() * 200 - 100,
        y : this.last_hit_type == "wall" ? -1 * this.destination.y - 10 : Math.random() * 200 - 100
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
    this.expertSystem.setFactValid("charged", this.caryingWood);
    this.expertSystem.setFactValid("uncharged", !this.caryingWood);
    this.expertSystem.setFactValid("different_heap", this.lastWoodHeap != this.lastPickUpHeap || this.lastPickUpHeap == null);
};

Termite.prototype.analyze = function() {

    return this.expertSystem.inferForward();
};

Termite.prototype.act = function(conclusions) {

    for (var i in conclusions) {
        if (conclusions[i] == "change_direction") {
            this.takeARandomDirection();
        } else if (conclusions[i] == "drop_wood") {
            this.lastWoodHeap.addWood();
            this.caryingWood = false;
            this.lastPickUpHeap = this.lastWoodHeap;
        } else if (conclusions[i] == "take_wood") {
            this.lastWoodHeap.takeWood();
            this.caryingWood = true;
        }
    }
};

Termite.prototype.draw = function(context) {
    context.fillStyle = this.caryingWood ? "rgba(255, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, this.boundingRadius, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

Termite.prototype.hasQueen = function() {
    return this.queen != null;
};

Termite.prototype.getQueen = function() {
    return this.queen;
};

Termite.prototype.setQueen = function(queen) {
    this.queen = queen;
    this.queen.informNewAgent(this);
};

Termite.prototype.processCollision = function(collidedAgent) {

    if (collidedAgent == null) {
        this.last_hit_type = "wall";
        return;
    }

    this.last_hit_type = collidedAgent.typeId;

    if (this.last_hit_type == "wood_heap") {
        this.lastWoodHeap = collidedAgent;

        if(!this.lastWoodHeap.hasQueen() && !this.lastWoodHeap.hasPheromone()) {

            if(this.hasQueen()) {
                // Le tas de bois est plus petit (20 points) que la puissance de sa reine actuelle.
                // Il laisse le phéromone de sa reine sur le tas de bois, le récolte et retourne auprès de sa reine en l’informant
                // de la position du tas de bois.

                if(this.lastWoodHeap.woodCount + 20 < this.getQueen().getPower()) {
                    var pheromone = new Pheromone(this.getQueen());
                    world.addAgent(pheromone);
                    this.lastWoodHeap.setPheromone(pheromone);
                    if (!this.caryingWood){
                        this.lastWoodHeap.takeWood();
                        this.caryingWood = true;
                    }
                }

                // Le tas de bois est plus grand (20 points) que la puissance de sa reine actuelle.
                // Il va alors changer le tas de bois en termitière et informer sa nouvelle reine de la position de son ancienne.
            }

            else {
                this.queen = new Queen(
                    {
                        x: this.lastWoodHeap.x,
                        y: this.lastWoodHeap.y,
                        power: this.lastWoodHeap.woodCount
                    }
                );

                this.queen.informNewAgent(this);

                this.lastWoodHeap.setQueen(this.queen);
                world.addAgent(this.queen);
            }
        }

        else if(this.lastWoodHeap.hasPheromone()) {

            var somme = this.lastWoodHeap.woodCount + this.lastWoodHeap.getPheromone().getQueen().getPower();
            if(this.hasQueen()){
                if((this.getQueen().getPower() + 20 ) < somme){
                    this.setQueen(this.lastWoodHeap.getPheromone().getQueen());

                    //informer nouvelle reine de la position de l'ancienne
                }
                else if(this.getQueen().getPower() > (somme + 20)){
                    var pheromone = new Pheromone(this.getQueen());
                    world.addAgent(pheromone);
                    this.lastWoodHeap.setPheromone(pheromone);

                    //retourner auprès de la reine pour l'informer
                }
                else{
                    if (!this.caryingWood){
                        this.lastWoodHeap.takeWood();
                        this.caryingWood = true;
                    }
                }
            }
            else{
                this.setQueen(this.lastWoodHeap.getPheromone().getQueen());
            }
        } 

        else {

            if(!this.queen) {

                this.setQueen(this.lastWoodHeap.getQueen());
            
            } else if (this.queen.id !== this.lastWoodHeap.getQueen().id) {


                if(this.getQueen().getPower() > (this.lastWoodHeap.getQueen().getPower() + 20)) {
                    
                    this.lastWoodHeap.killQueen();

                    // aller informer ma reine du nouveau tas de bois

                    var pheromone = new Pheromone(this.getQueen());
                    world.addAgent(pheromone);
                    this.lastWoodHeap.setPheromone(pheromone);

                } else if((this.getQueen().getPower() + 20) < this.lastWoodHeap.getQueen().getPower()) {

                    // jurer fidélité nouvelle reine et informer position ancienne reine

                } else {

                    // prendre bout de bois et retourner informer ma reine

                }

            }

        }
    }

    else if(this.last_hit_type == "termite") {
        if(collidedAgent.hasQueen()) {

            if(this.hasQueen()) {

                if(this.getQueen().getPower() > (collidedAgent.getQueen().getPower() + 20)) {
                    collidedAgent.setQueen(this.getQueen());
                } else if((this.getQueen().getPower() + 20) < collidedAgent.getQueen().getPower()) {
                    this.setQueen(collidedAgent.getQueen());
                }

            } else {
                this.setQueen(collidedAgent.getQueen());
            }
        } else if(this.hasQueen()) {
            collidedAgent.setQueen(this.getQueen());
        }
    }
};

Termite.prototype.processPerception = function(perceivedAgent) {
};
