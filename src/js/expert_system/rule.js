function Rule(goal, premises) {
	this.goal = goal;
	this.premises = premises;
}

Rule.prototype.isValid = function() {
	for(index=0; index < this.premises.length; ++index) {
		var premise = this.premises[index];
		if(!premise.isValid()) {
			return false;
		}
	}
	return true;
};

function RuleBase() {
	this.rules = [];
}

RuleBase.prototype.addRule = function(rule) {
	this.rules.push(rule);
};

RuleBase.prototype.primaryGoals = function() {
	var primaryGoals = [];
	for(var ruleIndex= 0 ; ruleIndex < this.rules.length; ++ruleIndex) {
		var rule = this.rules[ruleIndex];
		if(!this.isPremise(rule.goal.label)) {
			primaryGoals.push(rule.goal.label);
		}
	}
	return primaryGoals;
};

RuleBase.prototype.initialPremises = function(goalLabel, result) {
	if(result == undefined) result = [];

	for(var index=0; index < result.length; ++index) {
		if(result[index] == goalLabel) {
			return;
		}
	}

	var rules = this.rulesWithGoal(goalLabel);
	if(rules.length == 0) {
		result.push(goalLabel);
	} else {
		for(var ruleIndex=0; ruleIndex < rules.length; ++ ruleIndex) {
			var rule = rules[ruleIndex];
			for(var premiseIndex=0; premiseIndex < rule.premises.length; ++premiseIndex) {
				var premise = rule.premises[premiseIndex];
				this.initialPremises(premise.label, result);
			}
		}
	}

	return result;
};

RuleBase.prototype.isPremise = function(label) {
	for(var ruleIndex=0; ruleIndex < this.rules.length; ++ruleIndex) {
		var rule = this.rules[ruleIndex];
		for(var premiseIndex=0; premiseIndex < rule.premises.length; ++premiseIndex) {
			var premise = rule.premises[premiseIndex];
			if(premise.label == label) {
				return true;
			}
		}
	}
	return false;
};

RuleBase.prototype.rulesWithGoal = function(label) {
	var result = [];
	for(var ruleIndex=0; ruleIndex < this.rules.length; ++ruleIndex) {
		var rule = this.rules[ruleIndex];
		if(rule.goal.label == label) {
			result.push(rule);
		}
	}
	return result;
};

