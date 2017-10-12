({
    doInit : function(component, event, helper) {
        
        // Get the record id
        var caseId = component.get("v.caseId"),
        	startDate = component.get("v.startDate"),
            daysToDisplay = component.get("v.daysToDisplay"),
            datesInRange = [],
            fDate, y, m, d;
        
        if (startDate === null) {
            startDate = new Date();
            //console.log('MyScheduleForaCase * startDate: ' + startDate + ' - caseId: ' + caseId);
        }
        
        if (daysToDisplay === undefined) {
            daysToDisplay = 7;
        }
        
        console.log('MyScheduleForaCase * daysToDisplay: ' + daysToDisplay + ' - caseId: ' + caseId);

        // format the startDate
		if (startDate === undefined) {
        	// do nothing in order to keep the dates unchanged
        } else if (startDate.length > 5) {
            y = startDate.slice(0,4);
            m = startDate.slice(5,7) - 1;
            d = startDate.slice(8,10);
            
            //console.log('CapacityScheduleRowCntlr * y: ' + y + ' - m: ' + m + ' - d: ' + d);
            
            fDate = new Date(y,m,d);
            
            datesInRange = helper.getWeekDates(component, fDate);
        }
        
        // call the controller method that returns schedule__c records for this case
        var action = component.get("c.getUserCaseSchedules");
    
        action.setParams({
            caseId : caseId,
            startDate : startDate,
            daysToDisplay : daysToDisplay
        });
        
        // Add callback behavior when retrieving the records
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                console.log('MyScheduleForaCase query state: ' + state);
                //component.set("v.schedules", response.getReturnValue());
                var sArray = [],
                	schedules = [],
                	schAry = [],
                	schedule, schdlDate, hour, i, j, m, o, yr, mo, dy, fmtdDate;
                //console.log('datesInRange: ' + datesInRange.length);
                sArray = response.getReturnValue();
                 
                // loop through days in week
                for (m = 0, o = datesInRange.length; m < o; m = m + 1) {
                    
                    //console.log('CapacityScheduleRowCntlr * for date: ' + datesInRange[m]);
                    hour = 0;
                    schedule = {Id: "new", Hours__c: 0, Date__c: datesInRange[m]};
                    
                    // loop through schedule__c records
                    for (i = 0, j = sArray.length; i < j; i = i + 1) {
                        
                        schdlDate = sArray[i].Date__c;
                        
                        if (schdlDate === undefined || schdlDate === null) {
                            // do nothing in order to keep the dates unchanged
                        } else if (schdlDate.length > 5) {
                            yr = schdlDate.slice(0,4);
                            mo = schdlDate.slice(5,7) - 1;
                            dy = schdlDate.slice(8,10);
                            fmtdDate = new Date(yr,mo,dy);
                            //console.log('CapacityScheduleRowCntlr * schdlDate: ' + schdlDate + ' - fmtdDate: ' + fmtdDate + ' - sch nm: ' + sArray[i].Name);
                        }
                        
                        component.set("v.actName", sArray[i].Case__r.Account_Name_Text__c);
                        component.set("v.caseType", sArray[i].Case__r.Type);
                        component.set("v.caseRqstr", sArray[i].Case__r.Service_Requested_By_Name__c);
                        component.set("v.caseOpty", sArray[i].Case__r.Opportunity_Name__c);
                        component.set("v.caseDaysDue", sArray[i].Case__r.Days__c);
                        component.set("v.caseRqstdSvc", sArray[i].Case__r.Requested_Service__c);
                        //component.set("v.caseNumber", sArray[i].Case__r.CaseNumber);
                        
                        //console.log('CapacityScheduleRowCntlr * date: ' + datesInRange[m] + ' - schedule date: ' + fmtdDate + ' - sch nm: ' + sArray[i].Name);
                          
                        if (datesInRange[m].toString() === fmtdDate.toString()) {
                        //if (datesInRange[m] === sArray[i].Date__c) {
                            //console.log('CapacityScheduleRowCntlr * dates match for case: ' + sArray[i].Case__c + ' - schedule date: ' + fmtdDate + ' - hours: ' + sArray[i].Hours__c + ' - sch nm: ' + sArray[i].Name);
                            hour = sArray[i].Hours__c;
                            schedule = sArray[i];
                        } else {
                            //console.log('CapacityScheduleRowCntlr * dates no match: ' + datesInRange[m] + ' - schedule date: ' + fmtdDate + ' - sch nm: ' + sArray[i].Name);
                        }
                    }
                    
                    //console.log('added: ' + hour + " for date: " + datesInRange[m]);
                    
                    // should push hours and recordId into an array of objects - 1.14.17 tb
                    
                    // push hours into an array
                    
                    schAry.push(schedule);
                    schedules.push(hour);
                }
				component.set("v.schedules", schedules);
                component.set("v.scheduleRcds", schAry);
                
            } else {
                console.log("MyScheduleForaCase.doInit failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
	},

    showMore : function (component, event, helper) {

        var caseId = component.get("v.caseId"),
            elemId = "moreInfoCard",
            infoCard;

        infoCard = component.find(elemId);

        //console.log('MyScheduleForaCase.showMore');

        if ( $A.util.hasClass(infoCard,"slds-hide") ) {
            $A.util.removeClass(infoCard,"slds-hide");
            $A.util.addClass(infoCard,"slds-show");
        } else {
            $A.util.removeClass(infoCard,"slds-show");
            $A.util.addClass(infoCard,"slds-hide");
        }


    },
    
    navigateTo : function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        var caseId = component.get("v.caseId");
        navEvt.setParams({
			"recordId": caseId,
            "slideDevName": "related"
        });
        
        navEvt.fire();
    }
})