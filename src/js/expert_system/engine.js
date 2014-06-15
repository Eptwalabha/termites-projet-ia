function InferenceEngine() {

}

InferenceEngine.prototype.inferForward = function(factBase, ruleBase) {
	var inferredFacts = [];
	var finished = false;
	while(!finished) {
		finished = true;
		for (var ruleIndex=0; ruleIndex < ruleBase.rules.length; ++ruleIndex) {
			var rule = ruleBase.rules[ruleIndex];
			if(!rule.goal.isValid() && rule.isValid()) {
				rule.goal.value = true;
				inferredFacts.push(rule.goal.label);

				finished = false;
			}
		}
	}

	return inferredFacts;
};

InferenceEngine.prototype.inferBackward = function(factBase, ruleBase) {
	var primaryGoals = ruleBase.primaryGoals();
	for(var goalIndex=0; goalIndex < primaryGoals.length; ++goalIndex) {
		var goalLabel = primaryGoals[goalIndex];
		var initialPremises = ruleBase.initialPremises(goalLabel);
		for(var premiseIndex=0; premiseIndex < initialPremises.length; ++premiseIndex) {
			var premiseLabel = initialPremises[premiseIndex];
			if(!factBase.isFactValid(premiseLabel)) {
				return premiseLabel;
			}
		}
	}
	return null;
};
