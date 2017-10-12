({
    doInit : function(component, event, helper) {
        
        // Get the record id
        var caseId = component.get("v.recordId"),
	        startDate = component.get("v.startDate"),
            daysToDisplay = component.get("v.daysToDisplay"),
            datesInRange = [];

        if (startDate != null || startDate != undefined) {

            datesInRange = helper.getWeekShortDates(component,startDate);
        }

        // call the controller method that returns a team's schedule__c records for this case
        var action = component.get("c.getTeamSchedules");

        action.setParams({
            caseId : caseId,
            startDate : startDate,
            daysToDisplay : daysToDisplay
        });
    
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState(),
            	sArray = [],
            	teamMembers = new Set(),
            	team = [],
            	schAry = [],
            	schedule, errSchedule, totalDateHours, date, 
            	hour, i, j, m, o, p, r, calDate, fDate, y, m, d;

            if (component.isValid() && state === "SUCCESS") {
                console.log('CapacityScheduleCaseTeamHrs.doinit query state: ' + state);

                if (response.getReturnValue() != null) {
                    sArray = response.getReturnValue();
                    component.set("v.scheduleRcds", sArray);
                    console.log('CapacityScheduleCaseTeamHrs.doinit sArray.length: ' + sArray.length);
                }

                // ** loop through schedules to create a unique set of team members
                // **

                if (sArray.length > 0) {
                    
                    // set hasScheduleRcds to true
                    component.set("v.hasScheduleRcds",true);
                    
                    // put team member name into an array for later display
                    for (p = 0, r = sArray.length; p < r; p = p + 1) {
                    	teamMembers.add(sArray[p].OwnerId__r.Name);
                        //console.log('CapacityScheduleCaseTeamHrs.doinit sId: ' + sArray[p].Id + ' - team member: ' + sArray[p].OwnerId__r.Name + ' - hours: ' + sArray[p].Hours__c);
                    }
                }

                // convert unique Set of team members into an array and assign it to the component variable for iteration
                team = [...teamMembers];
                component.set("v.teamMembers", team);
                

            } else {
                console.log("CapacityScheduleCaseTeamHrs.doinit * Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	}
})