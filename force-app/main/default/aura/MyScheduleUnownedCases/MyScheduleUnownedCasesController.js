({
    doInit : function(component, event, helper) {
        
        var caseIdsArray = [], 
            sArray = [],
            caseId, action, i, j, m, n, casesSet;
        
        // Get the record id
        caseId = component.get("v.recordId");

        // call the controller method that returns schedule__c records for this case
        action = component.get("c.getUserSchedulesForUnownedCases");
    
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState();
            var caseObjArry = [];
            if (component.isValid() && state === "SUCCESS") {
                console.log('CapacityScheduleUnowned query state: ' + state);
                
                sArray = response.getReturnValue();
                
                // set component.set("v.hasSchedule",false);
                if ( sArray.length === 0) {
                    component.set("v.hasSchedule",false);
                } else {
                    component.set("v.hasSchedule",true);
                }
                
                
                // loop through schedule__c records
                for (i = 0, j = sArray.length; i < j; i = i + 1) {
                    caseIdsArray.push(sArray[i].Case__c);
                    console.log('CapacityScheduleUnowned * case id: ' + sArray[i].Case__c);
                }
                
                // change array into a Set to deduplicate the case ids
                casesSet = new Set(caseIdsArray);
                
                // change deduplicated set of case ids back to an array
                caseIdsArray = [...casesSet];
                var count = 0;

                console.log('CapacityScheduleUnowned unique cases: ' + caseIdsArray.length);

                // loop through unique case array to find the case header info
                for (i = 0, j = caseIdsArray.length; i < j; i = i + 1) {
                    var caseRcdId = caseIdsArray[i];

                    console.log('CapacityScheduleUnowned * i: ' + i + ' - caseRcdId: ' + caseRcdId);

                        for (m = 0, n = sArray.length; m < n; m = m + 1) {
                            console.log('CapacityScheduleUnowned * i: ' + i + ' - m: ' + m);
                            if ( i === caseObjArry.length ) {
                                console.log('CapacityScheduleUnowned * i: ' + i + ' - m: ' + m + ' - caseObjArry.length: ' + caseObjArry.length);

                                if (caseRcdId === sArray[m].Case__c) {
                                    caseObjArry.push(sArray[m]);
                                    console.log('CapacityScheduleUnowned * add this caseRcdId: ' + caseRcdId + ' -  ' + sArray[m].Case__c);
                                }
                            }
                        }
                    


                    console.log('CapacityScheduleUnowned * caseObjArry.length: ' + caseObjArry.length);
                }


                
                // set unownedCases variable to this array of case ids
                //component.set("v.unownedCases", caseIdsArray);
                component.set("v.unownedCases", caseObjArry);
            } else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	}
})