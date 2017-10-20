({
    doInit : function(component, event, helper) {
        var sArray = component.get("v.scheduleRcds");
        console.log('CapacitySchedulesForUser.doInit sArray.length: ' + sArray.length);

        helper.sumSchedulesByCase(component, event);
    },

    toggleUserSchedules : function(component, event, helper) {
        
        var isVisible = component.get("v.showUserSchedules");
        var userId = component.get("v.userId");
                
        if (isVisible) {
            component.set("v.showUserSchedules",false);
        } else {
            component.set("v.showUserSchedules",true);
        }
    }
})
