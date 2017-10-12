({
    doInit : function(component, event, helper) {

        // retrieve request types
        helper.retrieveRequestTypes(component, event);

    },

    selectRqstType : function(component, event, helper) { 

        var selectedRqstType = component.get("v.selectedRqstType");

        console.log('CapacityManagement.selectRqstType: ' + selectedRqstType);   
    }
})