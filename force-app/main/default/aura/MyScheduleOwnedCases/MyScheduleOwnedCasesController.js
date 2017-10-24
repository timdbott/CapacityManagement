({
    doInit : function(component, event, helper) {
        
        helper.findOpenCases(component, event);
	},

    toggleClosedCases : function(component, event, helper) {

    var showClosedCases = event.getParam("showClosedCases");
    console.log('MyScheduleOwnedCases.toggleClosedCases showClosedCases? ' + showClosedCases);
        
        if (showClosedCases !== null || showClosedCases !== 'undefined' || showClosedCases !== undefined) {
            if (showClosedCases === true) {
                helper.findAllCases(component, event);
            } else if (showClosedCases === false) {
                helper.findOpenCases(component, event);
            }
        }

    }
})