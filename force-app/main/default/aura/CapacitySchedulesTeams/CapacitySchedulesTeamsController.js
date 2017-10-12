({
	doInit : function(component, event, helper) {
        
        var caseTeam = component.get("v.caseTeam");
        console.log('CapacitySchedulesTeams.doInit - caseTeam: ' + caseTeam);

        // moved to CapacitySchedules.cmp

    },

    changedTeam : function (component, event, helper) {
        
        var params = event.getParam('arguments');
        if (params) {
            var newTeam = params.newTeam;
            console.log("changedTeam.newTeam: " + newTeam);
            component.set("v.caseTeam",newTeam);
            return newTeam;
            console.log("CapacitySchedulesTeams.changedTeam -  caseTeam: " + component.get("v.caseTeam"));
        }
    }
})