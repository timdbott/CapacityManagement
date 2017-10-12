({
	retrieveUserInfo : function(component, event) {

		console.log('CapacityManagement.retrieveUserInfo started');
		
		// call the controller method that returns the current user's info
        var action = component.get("c.getUserInfo");
		
		// Add callback behavior when retrieving the records
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (component.isValid() && state === "SUCCESS") {
				console.log('CapacityManagement.retrieveUserInfo query state: ' + state);
				//console.log('CapacityManagement.retrieveUserInfo.currentUserInfo: ' + response.getReturnValue().Name);
				component.set("v.currentUser", response.getReturnValue());
			} else {
				console.log("CapacityManagement.retrieveUserInfo Failed with state: " + state);
			}
		});
	
		// Send action off to be executed
		$A.enqueueAction(action);
	},

	retrieveRequestTypes : function(component, event) {

		console.log('CapacityManagement.doinit started');

		// call the controller method that returns picklist values for case type
        var action = component.get("c.getRequestTypes");
		
		// Add callback behavior when retrieving the records
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (component.isValid() && state === "SUCCESS") {
				console.log('CapacityManagement.doinit query state: ' + state);
				component.set("v.caseRqstTypes", response.getReturnValue());
			} else {
				console.log("CapacityManagement.doinit Failed with state: " + state);
			}
		});
	
		// Send action off to be executed
		$A.enqueueAction(action);
	}
})