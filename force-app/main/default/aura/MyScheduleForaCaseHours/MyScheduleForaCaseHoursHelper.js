({
    
    init: function(component, event) {
        var loadedHrs = component.get("v.loadedHours");
        component.set("v.originalHours", loadedHrs);
        
        console.log('MyScheduleForaCaseHours - recordId: ' + component.get("v.recordId") + "  - hours: " + loadedHrs);
            
        if (loadedHrs > 6) {
            component.set("v.isRed", true);
            component.set("v.isYellow", false);
            component.set("v.isGreen", false);
            component.set("v.isWhite", false);
        } else if (loadedHrs > 4) {
            component.set("v.isRed", false);
            component.set("v.isYellow", true);
            component.set("v.isGreen", false);
            component.set("v.isWhite", false);
        } else if (loadedHrs <= 4 && loadedHrs !== 0) {
            component.set("v.isRed", false);
            component.set("v.isYellow", false);
            component.set("v.isGreen", true);
            component.set("v.isWhite", false);
        } else {
            component.set("v.isRed", false);
            component.set("v.isYellow", false);
            component.set("v.isGreen", false);
            component.set("v.isWhite", true);
        }
    },
    
    saveHours: function(component, recordId, hours) {
        //Save the expense and update the view
        this.upsertHours(component, recordId, hours, function(response) {

            var state = response.getState();
            var spinner = component.find("rowSpinner");
            //console.log('MyScheduleForaCaseHourssaveHours * callback complete with state: ' + state);

            if (component.isValid() && state === "SUCCESS") {

                // grab the new record id for the schedule record
                var schedule = response.getReturnValue();
                var sId = schedule.Id;

                // set the recordId for this component to the new id
                component.set("v.recordId", sId);

                // trigger total hours cmp to refresh
                var refreshTotalsEvent = component.getEvent("CapacityManagementNotifyHoursChangeEvent");
                refreshTotalsEvent.fire();

                // hide spinner
                $A.util.toggleClass(spinner, "slds-show");
                
                // refresh this component in case the color needs to change
                this.init(component, event);

            } //else if (cmp.isValid() && state === "INCOMPLETE") {
            else if (state === "INCOMPLETE") {
                console.log("MyScheduleForaCaseHours.saveHours * Failed with state: " + state);
            } //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {

                // hide spinner
                $A.util.toggleClass(spinner, "slds-show");
                
                var errSchAry = [],
                    datesInRange,
                    errors = response.getError();
                
                component.set("v.errorMsg","MyScheduleForaCaseHours.saveHours Could not save hours. Please try again later.");
                
                // loop through days in week
                for (m = 0, o = datesInRange.length; m < o; m = m + 1) {
                    errSchedule = {};
                    // set errSchedule for users without a schedule record yet
                    errSchedule = {Date__c: datesInRange[m], Hours__c: 0};
                    errSchAry.push(errSchedule);
                }
                component.set("v.scheduleRcds", errSchAry);
                
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("MyScheduleForaCaseHours.saveHours * Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("MyScheduleForaCaseHourssaveHours * Unknown error");
                }
            }

        });
    },
    
    upsertHours : function(component, recordId, hours, callback) {
        var action = component.get("c.saveSchedule");

        // unhide spinner
        var spinner = component.find("rowSpinner");
        $A.util.toggleClass(spinner, "slds-show");

        action.setParams({ 
            "Id" : recordId,
            "hours": hours
        });
        
        if (callback) {
            action.setCallback(this, callback);
        }
        
        $A.enqueueAction(action);
    },
    
	addHours: function(component, caseId, dateForHours, hours) {
        //Save the expense and update the view
        this.insertHours(component, caseId, dateForHours, hours, function(response) {

            var state = response.getState();

            // hide spinner
            var spinner = component.find("rowSpinner");

            //console.log('MyScheduleForaCaseHours.addHours * callback complete with state: ' + state);

            if (component.isValid() && state === "SUCCESS") {

                // grab the new record id for the schedule record
                var schedule = response.getReturnValue();
                var sId = schedule.Id;

                // set the recordId for this component to the new id
                component.set("v.recordId", sId);

                // trigger total hours cmp to refresh
                var refreshTotalsEvent = component.getEvent("CapacityManagementNotifyHoursChangeEvent");
                refreshTotalsEvent.fire();

                //console.log('MyScheduleForaCaseHours.addHours fired CapacityManagementNotifyHoursChangeEvent');
                // hide spinner
                $A.util.toggleClass(spinner, "slds-show");
                
                // refresh this component in case the color needs to change
                this.init(component, event);
            } //else if (cmp.isValid() && state === "INCOMPLETE") {
            else if (state === "INCOMPLETE") {
                console.log("CapacityHours/Helper.addHours * Failed with state: " + state);
            } //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {
                
                var errSchAry = [],
                    errors = response.getError();

                // hide spinner
                $A.util.toggleClass(spinner, "slds-show");
                
                component.set("v.errorMsg","MyScheduleForaCaseHours.addHours Could not add hours. Please try again later.");
                
                // loop through days in week
                /*  10.4.17 tb
                 for (m = 0, o = datesInRange.length; m < o; m = m + 1) {
                    errSchedule = {};
                    // set errSchedule for users without a schedule record yet
                    errSchedule = {Date__c: datesInRange[m], Hours__c: 0};
                    errSchAry.push(errSchedule);
                }
                */
                component.set("v.scheduleRcds", errSchAry);
                
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("MyScheduleForaCaseHours.addHours * Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("MyScheduleForaCaseHours.addHours * Unknown error");
                }
            }


        });
    },
    
    insertHours : function(component, caseId, dateForHours, hours, callback) {

        //console.log('MyScheduleForaCaseHours.insertHours add new schedule: caseid - ' + caseId + ', date - ' + dateForHours + ', hrs - ' + hours);
        var action = component.get("c.insertSchedule");
        var year = dateForHours.getFullYear();
        var month = dateForHours.getMonth() + 1;
        var day = dateForHours.getDate();

        // unhide spinner
        var spinner = component.find("rowSpinner");
        $A.util.toggleClass(spinner, "slds-show");

        month = month.toString().length === 2 ? month : 0 + month.toString();
        day = day.toString().length === 2 ? day : 0 + day.toString();

        var dtForHours = year + '-' + month + '-' + day;

        console.log('dtForHours: ' + dtForHours);
        console.log('dateForHours: ' + dateForHours);
		
      action.setParams({ 
          "caseId" : caseId,
          "dateForHours" : dtForHours,
          "hours" : hours
      });
      if (callback) {
          action.setCallback(this, callback);
      }
      $A.enqueueAction(action);
    }
})