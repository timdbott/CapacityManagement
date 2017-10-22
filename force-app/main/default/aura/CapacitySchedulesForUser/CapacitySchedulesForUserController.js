({
    doInit : function(component, event, helper) {
        var sArray = component.get("v.scheduleRcds");
        console.log('CapacitySchedulesForUser.doInit sArray.length: ' + sArray.length);

        // separate the schedules by case
        //helper.sumSchedulesByCase(component, event);
    },

    toggleUserSchedules : function(component, event, helper) {
        
        var userId = component.get("v.userId");
                
        // build user's case/schedule rows
        console.log("// build user's case/schedule rows");
        helper.findUserCaseSchedules(component, event);
    }
})
