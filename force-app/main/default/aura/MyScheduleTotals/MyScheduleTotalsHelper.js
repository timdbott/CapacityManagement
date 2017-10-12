({
    
    init: function(component, event) {
        var loadedHrs = component.get("v.loadedHours");
        component.set("v.originalHours", loadedHrs);
        
        if (loadedHrs === 'undefined') {
            loadedHrs = '0';
            component.set("v.loadedHours",0);
        }
        //console.log('capacityScheduleAllHoursHlpr * recordId: ' + component.get("v.recordId") + "  - hours: " + loadedHrs);
            
        if (loadedHrs > 6.5) {
            component.set("v.isRed", true);
            component.set("v.isYellow", false);
            component.set("v.isGreen", false);
            component.set("v.isWhite", false);
        } else if (loadedHrs > 4) {
            component.set("v.isRed", false);
            component.set("v.isYellow", true);
            component.set("v.isGreen", false);
            component.set("v.isWhite", false);
        } else if (loadedHrs <= 4 && loadedHrs != 0) {
            component.set("v.isRed", false);
            component.set("v.isYellow", false);
            component.set("v.isGreen", true);
            component.set("v.isWhite", false);
        } else {
            component.set("v.loadedHours",0.00);
            component.set("v.isRed", false);
            component.set("v.isYellow", false);
            component.set("v.isGreen", false);
            component.set("v.isWhite", true);
        }
    }
})