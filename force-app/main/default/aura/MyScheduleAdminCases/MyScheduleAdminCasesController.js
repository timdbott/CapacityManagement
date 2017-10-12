({
    doInit : function(component, event, helper) {
        
        // Get the record id
        var caseId = component.get("v.recordId");

        // call the controller method that returns schedule__c records for this case
        var action = component.get("c.getAdminCases");
    
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log('CapacityScheduleAdmin doinit query state: ' + state);
                component.set("v.adminCases", response.getReturnValue());
            } else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	}
})