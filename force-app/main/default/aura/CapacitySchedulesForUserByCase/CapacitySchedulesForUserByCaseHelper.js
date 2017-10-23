({
    handleShowModal: function(component, event) {
        var caseId = component.get("v.caseId"),
            modalBody = 'test modal body',
            fields = ['Account_Name_Text__c','Opportunity_Name__c','Type','Requested_Completion_Date__c','Service_Requested_By_Name__c'],
            schedules = component.get("v.scheduleRcds"),
            actName, actClass, optyName, optyAmnt, caseType, dueDate, rqstBy;

            actName = schedules[0].Case__r.Account_Name_Text__c;
            actClass = schedules[0].Case__r.Account_Classification__c;
            optyName = schedules[0].Case__r.Opportunity_Name__c;
            caseType = schedules[0].Case__r.Type;
            dueDate = schedules[0].Case__r.Requested_Completion_Date__c;
            rqstBy = schedules[0].Case__r.Service_Requested_By_Name__c;

        //CapacitySchedulesCaseInfo

        $A.createComponent("c:CapacitySchedulesCaseInfo", {
            "caseId" : caseId,
            "actName" : actName,
            "actClass" : actClass,
            "optyName" : optyName,
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
        
                    
                
    }
})
