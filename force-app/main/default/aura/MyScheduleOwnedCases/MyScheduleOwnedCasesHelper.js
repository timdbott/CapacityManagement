({
	findOpenCases : function(component, event) {
		
        // call the controller method that returns schedule__c records for this case
        var action = component.get("c.getUserOpenCases");
    
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                //console.log('MyScheduleOwnedCases.findOpenCases query state: ' + state);
                casesArray = response.getReturnValue();

                // set component.set("v.hasSchedule",false);
                if ( casesArray.length === 0) {
                    component.set("v.hasSchedule",false);
                } else {
                    component.set("v.hasSchedule",true);
                }


                component.set("v.ownedCases", casesArray);
            } else {
                console.log("MyScheduleOwnedCases.findOpenCases Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	},
    
    findAllCases : function(component, event) {
		
        // call the controller method that returns schedule__c records for this case
        var action = component.get("c.getUserAllCases");
    
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                //console.log('MyScheduleOwnedCases.findAllCases query state: ' + state);
                casesArray = response.getReturnValue();

                // set component.set("v.hasSchedule",false);
                if ( casesArray.length === 0) {
                    component.set("v.hasSchedule",false);
                } else {
                    component.set("v.hasSchedule",true);
                }


                component.set("v.ownedCases", casesArray);
            } else {
                console.log("MyScheduleOwnedCases.findAllCases Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	}
})