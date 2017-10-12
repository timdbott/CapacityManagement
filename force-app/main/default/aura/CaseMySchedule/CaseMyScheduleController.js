({
    doInit : function(component, event, helper) {
        
        // Get the record id
        var caseId = component.get("v.recordId"),
            daysToDisplay = component.get("v.daysToDisplay"),
            d = new Date(), 
            year, month, day, fDate, initDate, 
            startDate = component.get("v.startDate");

            console.log('CaseMySchedule.doinit * startDate: ' + startDate + ' - caseId: ' + caseId);
/*
        if (component.get("v.startDate") != null) {
            fDate = component.get("v.startDate");
            console.log('CapacityScheduleCaseMyHrs.doinit * start date already exists, here is the starting Monday: ' + fDate);
        } else {
            // component just initalized so no date yet.
            d = helper.getStartingMonday(component,d);
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();
            month = month.toString().length === 2 ? month : 0 + month.toString();
            day = day.toString().length === 2 ? day : 0 + day.toString();
            
            fDate = year + "-" + month + "-" + day;
            
            console.log('CapacityScheduleCaseMyHrs.doinit * starting Monday: ' + fDate);
        }
*/  
        // call the controller method that returns schedule__c records for this case
        var action = component.get("c.getCaseInfo");

        action.setParams({
            caseId : caseId
        });
    
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState(),
                i, j;
            if (component.isValid() && state === "SUCCESS") {
                console.log('CaseMySchedule.doinit query state: ' + state);

                cArray = response.getReturnValue()

                for ( i = 0, j = cArray.length; i < j; i++) {
                    component.set("v.actName", cArray[i].Account_Name_Text__c);
                    component.set("v.caseType", cArray[i].Type);
                    component.set("v.caseRqstr", cArray[i].Service_Requested_By_Name__c);
                    component.set("v.caseOpty", cArray[i].Opportunity_Name__c);
                    component.set("v.caseDaysDue", cArray[i].Days__c);
                    component.set("v.caseRqstdSvc", cArray[i].Requested_Service__c);
                    component.set("v.caseNumber", cArray[i].CaseNumber);
                    component.set("v.caseDueDate", cArray[i].Requested_Completion_Date__c);
                    component.set("v.caseOptyAmnt", cArray[i].Opportunity_Est_Disc_Sales__c);
                    component.set("v.caseActCls", cArray[i].Account_Classification__c);
                }

                component.set("v.ownedCases", cArray);
            } else {
                console.log("CaseMySchedule.doinit * Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	}
})