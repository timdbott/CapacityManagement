({
    handleShowModal: function(component, event) {
        var caseId = component.get("v.caseId"),
            modalBody = 'test modal body',
            fields = ['Account_Name_Text__c','Opportunity_Name__c','Type','Requested_Completion_Date__c','Service_Requested_By_Name__c'],
            schedules = component.get("v.scheduleRcds"),
            actName, actClass, optyName, optyAmnt, caseType, dueDate, rqstBy;

            actName = this.clarifyFieldValue(component, event, schedules[0].Case__r.Account_Name_Text__c);
            actClass = this.clarifyFieldValue(component, event, schedules[0].Case__r.Account_Classification__c);
            optyName = this.clarifyFieldValue(component, event, schedules[0].Case__r.Opportunity_Name__c);
            optyAmnt = this.clarifyFieldValue(component, event, schedules[0].Case__r.Opportunity_Est_Disc_Sales__c);
            caseType = this.clarifyFieldValue(component, event, schedules[0].Case__r.Type);
            dueDate = this.clarifyFieldValue(component, event, schedules[0].Case__r.Requested_Completion_Date__c);
            rqstBy = this.clarifyFieldValue(component, event, schedules[0].Case__r.Service_Requested_By_Name__c);

        //CapacitySchedulesCaseInfo

        $A.createComponent("c:CapacitySchedulesCaseInfo", {
            "caseId" : caseId,
            "actName" : actName,
            "actClass" : actClass,
            "optyName" : optyName,
            "caseType" : caseType,
            "rqstBy" : rqstBy,
            "dueDate" : dueDate,
            "optyAmnt" : optyAmnt,
            "fields" : fields,
            "layout" : "COMPACT"
        },
        function(content, status) {
            if (status === "SUCCESS") {
                modalBody = content;
                component.find('overlayLib').showCustomModal({
                    header: "Case Info",
                    body: modalBody, 
                    showCloseButton: true,
                    cssClass: "",
                    
                })
                
            }
            
        }); 
    },

    clarifyFieldValue : function (component, event, val) {

        console.log('clarifyFieldValue.val: ' + val);

        if (val === undefined || val === null) {
            val = " - ";
        } else {
            val = val;
        }

        return val;
    },

    handleShowPopover : function (component, event) {

        var caseId = component.get("v.caseId"),
            modalBody = 'test modal body',
            fields = ['Account_Name_Text__c','Opportunity_Name__c','Type','Requested_Completion_Date__c','Service_Requested_By_Name__c'],
            schedules = component.get("v.scheduleRcds"),
            actName, actClass, optyName, optyAmnt, caseType, dueDate, rqstBy;

        actName = this.clarifyFieldValue(component, event, schedules[0].Case__r.Account_Name_Text__c);
        actClass = this.clarifyFieldValue(component, event, schedules[0].Case__r.Account_Classification__c);
        optyName = this.clarifyFieldValue(component, event, schedules[0].Case__r.Opportunity_Name__c);
        optyAmnt = this.clarifyFieldValue(component, event, schedules[0].Case__r.Opportunity_Est_Disc_Sales__c);
        caseType = this.clarifyFieldValue(component, event, schedules[0].Case__r.Type);
        dueDate = this.clarifyFieldValue(component, event, schedules[0].Case__r.Requested_Completion_Date__c);
        rqstBy = this.clarifyFieldValue(component, event, schedules[0].Case__r.Service_Requested_By_Name__c);

        //CapacitySchedulesCaseInfo

        $A.createComponent("c:CapacitySchedulesCaseInfo", {
            "caseId" : caseId,
            "actName" : actName,
            "actClass" : actClass,
            "optyName" : optyName,
            "caseType" : caseType,
            "rqstBy" : rqstBy,
            "dueDate" : dueDate,
            "optyAmnt" : optyAmnt,
            "fields" : fields,
            "layout" : "COMPACT"
        },
        function(content, status) {
            if (status === "SUCCESS") {
                modalBody = content;
                component.find('overlayLib').showCustomPopover({
                    //body: "Popovers are positioned relative to a reference element",
                    body : modalBody,
                    referenceSelector: ".caseType",
                    cssClass: "popoverclass,no-pointer"
                }).then(function (overlay) {
                    setTimeout(function(){
                        //close the popover after 3 seconds
                        overlay.close(); 
                    }, 3000);
                });

            }
        }); 

    }

})
