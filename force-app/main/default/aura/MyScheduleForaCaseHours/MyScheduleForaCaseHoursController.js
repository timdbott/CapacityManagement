({
    doInit : function(component, event, helper) {
        var dateForHours = component.get("v.dateForHours");
        console.log('MyScheduleForaCaseHours.doInit * recordId: ' + component.get("v.recordId") + ' - caseId: ' + component.get("v.caseId") + ' * dateForHrs: ' + dateForHours);
        
        helper.init(component, event);
    },
    
    handleHrsChngEvnt : function(component, event, helper) {
        
        console.log('* handleHrsChngEvnt *');
    },
    
    validate : function(component, event, helper) {
        var inputCmp = event.getSource();  //component.find("inputCmp");
        var newHrs = event.getSource().get("v.value");  //inputCmp.get("v.value");
        var originalHrs = component.get("v.originalHours");
        var recordId = component.get("v.recordId");
        var caseId = component.get("v.caseId");
        var dateForHours = component.get("v.dateForHours");
        
        //console.log('SAVE: Id: ' + recordId + ' - caseId: ' + caseId);

        // Did value change?
        if (originalHrs !== newHrs) {

            // Check if input is numeric
            if (isNaN(newHrs)) {
                inputCmp.set("v.errors", [{message:"Input not a number: " + newHrs}]);
            } else if (newHrs < 0 || newHrs > 24) {
                inputCmp.set("v.errors", [{message:"Must be >0 or < 25: " + newHrs}]);
            } else {
                inputCmp.set("v.errors", null);
            }

            // create new record if recordId = new
            if (recordId === "new") {
                // create new
                helper.addHours(component,caseId,dateForHours,newHrs);
            } else {
                // save existing
                helper.saveHours(component,recordId,newHrs);
            }
            
            //inputCmp.set("v.errors", [{message:"need to save change. "+originalHrs +"!=="+ newHrs}]);
        } else {
            // no change required
            //inputCmp.set("v.errors", [{message:"no change"+originalHrs +"="+ newHrs}]);
        }
    }
    
})