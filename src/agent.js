function Agent () {
	this.typeId = "agent";
	this.x = 0;
	this.y = 0;
	this.boundingRadius = 0;
	this.collideTypes = [];
	this.contactTypes = [];
	
	this.dropped = null;	
	this.dead = false;

    this.world = null;
}

Agent.prototype.setWorld = function(world) {
    this.world = world;
};

Agent.prototype.update = function(dt) {

};

Agent.prototype.draw = function(context) {

};

Agent.prototype.processCollision = function(collidedAgent) {

};

Agent.prototype.collides = function(agent) {
	return this.collideTypes.indexOf(agent.typeId) != -1;

};

Agent.prototype.contacts = function(agent) {
	return this.contactTypes.indexOf(agent.typeId) != -1;

};

Agent.prototype.drop = function(agent) {
	this.dropped = agent;
};

Agent.prototype.moveTo = function(x, y) {
	this.x = x;
	this.y = y;
};

Agent.prototype.moveBy = function(direction, length) {
	if(direction.x != 0 && direction.y != 0 && length > 0) {
		var moveVect = new Vect(direction.x, direction.y);
		moveVect.normalize(length);
		//console.log(direction.x, direction.y);
		this.x += moveVect.x;
		this.y += moveVect.y;
	}
};
