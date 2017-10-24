({
    doInit : function(component, event, helper) {
        var schedules = component.get("v.scheduleRcds"),
            actName, actClass, optyName, optyAmnt, caseType, dueDate, rqstBy;

        actName = schedules[0].Case__r.Account_Name_Text__c;
        actClass = schedules[0].Case__r.Account_Classification__c;
        optyName = schedules[0].Case__r.Opportunity_Name__c;
        caseType = schedules[0].Case__r.Type;
        dueDate = schedules[0].Case__r.Requested_Completion_Date__c;
        rqstBy = schedules[0].Case__r.Service_Requested_By_Name__c;

        if (optyName === 'undefined' || optyName === undefined || optyName === null) {
            optyName = ' - ';
            optyAmnt = ' - ';
        } else {
            optyAmnt = schedules[0].Case__r.Opportunity_Est_Disc_Sales__c;
        }

        console.log('CapacitySchedulesForUserByCase.schedules.length: ' + schedules.length);

        console.log('CapacitySchedulesForUserByCase.actName: ' + actName);
        console.log('CapacitySchedulesForUserByCase.actClass: ' + actClass);
        console.log('CapacitySchedulesForUserByCase.optyName: ' + optyName);
        console.log('CapacitySchedulesForUserByCase.optyAmnt: ' + optyAmnt);
        console.log('CapacitySchedulesForUserByCase.caseType: ' + caseType);
        console.log('CapacitySchedulesForUserByCase.dueDate: ' + dueDate);
        console.log('CapacitySchedulesForUserByCase.rqstBy: ' + rqstBy);

        component.set("v.caseType",caseType);
        
    },

    createTileCmp : function(component, event, helper) {
        var schedules = component.get("v.scheduleRcds"),
            actName, actClass, optyName, optyAmnt, caseType, dueDate, rqstBy;

        actName = schedules[0].Case__r.Account_Name_Text__c;
        actClass = schedules[0].Case__r.Account_Classification__c;
        optyName = schedules[0].Case__r.Opportunity_Name__c;
        caseType = schedules[0].Case__r.Type;
        dueDate = schedules[0].Case__r.Requested_Completion_Date__c;
        rqstBy = schedules[0].Case__r.Service_Requested_By_Name__c;

        component.set("v.actName", schedules[0].Case__r.Account_Name_Text__c);
        component.set("v.actClass", schedules[0].Case__r.Account_Classification__c);
        component.set("v.optyName", schedules[0].Case__r.Opportunity_Name__c);
        component.set("v.caseType", schedules[0].Case__r.Type);
        component.set("v.dueDate", schedules[0].Case__r.Requested_Completion_Date__c);
        component.set("v.rqstBy", schedules[0].Case__r.Service_Requested_By_Name__c);

        if (optyName === 'undefined' || optyName === undefined || optyName === null) {
            optyName = ' - ';
            optyAmnt = ' - ';
        } else {
            optyAmnt = schedules[0].Case__r.Opportunity_Est_Disc_Sales__c;
        }
        component.set("v.optyAmnt", optyAmnt);

        // show details in a modal
        //helper.handleShowModal(component, event);

        // show details in a popover
        helper.handleShowPopover(component, event);
    }
})
