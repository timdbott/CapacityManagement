({

    // formats a js date to MMM dd
    dateFormatToMD : function(dateToFormat) {
        
        var m, d, fDate;
        	
        if (dateToFormat != undefined && dateToFormat != null) {
           
            m = dateToFormat.toString().slice(4,8);
            d = dateToFormat.getDate();
            
            fDate = m + " " + d;
        }
        
        return fDate;
	},

	getWeekShortDates : function(component, startDate) {
                
        var numOfDays = component.get("v.daysToDisplay"), 
            year, month, day, d, day, diff, monday, nextDay, 
            newDate, i, j, yr, mo, dy, shortDate, sunday, formattedDateHeader,
            datesInWeek = [];
        
        //console.log('capacityscheduleallrowhlpr * startDate: ' + startDate);
        
        //year = startDate.getFullYear();
        //month = startDate.getMonth() + 1;
        //day = startDate.getDay();
        
        // startDate is in '2017-03-07T05:00:00.000Z' format
        year = startDate.slice(0,4);
        month = startDate.slice(5,7) - 1;
        day = startDate.slice(8,10);
        
        d = new Date(year,month,day);
        // find day # of the week ('0' = sunday)
        day = d.getDay();
        // find day # of month
        diff = d.getDate() - day + (day == 0 ? -7 : 0);
        //find monday
        monday = new Date(d.setDate(diff + 1));
        sunday = new Date(monday);
        sunday.setDate(sunday.getDate() + 6);
        formattedDateHeader = this.dateFormatToMD(monday) + " - " + this.dateFormatToMD(sunday);
        
        //component.set("v.formattedDateHeader",formattedDateHeader);
                        
        // loop through numofdays and push dates in array
        for (i = 0, j = numOfDays; i < j; i = i + 1) {
			
            nextDay = new Date(monday.valueOf());
            nextDay = nextDay.setDate(nextDay.getDate() + i);
            newDate = new Date(nextDay);
            
            yr = newDate.getFullYear();
            mo = newDate.getMonth() + 1;
            dy = newDate.getDate();
            mo = mo.toString().length === 2 ? mo : 0 + mo.toString();
            dy = dy.toString().length === 2 ? dy : 0 + dy.toString();
            
            shortDate = yr + '-' + mo + '-' + dy;
            
            //console.log('CSAllRowHlpr * startDate: ' + startDate + ' - short date: ' + shortDate + ' -d: ' + d);
			
            datesInWeek.push(shortDate);
            //datesInWeek.push(newDate);
        }

        return datesInWeek;
    },

    // take the user's total schedules and summarize by case
    findUserCaseSchedules : function(component, event) {
        
        var userId = component.get("v.userId"),
        	startDate = component.get("v.startDate"),
            daysToDisplay = component.get("v.daysToDisplay"),
        	datesInRange = this.getWeekShortDates(component,startDate),
        	sArray = [],
        	schedules = [],
            schAry = [],
            sCases = [],
            uniqueCases = [],
        	thisCase, thisCaseId, caseId, schedule, date, hour, i, j, m, n, y, z;

        //console.log('initializing CapacitySchedulesForUser.sumSchedulesByCase...from ' + event.getSource() + ' - startDate: ' + startDate);
        
    //  **********   Find schedules and cases

        // get schedules array of objects
        sArray = component.get("v.scheduleRcds");
        
        console.log('CapacitySchedulesForUser.sumSchedulesByCase.sArray.length: ' + sArray.length);

        // loop through schedule__c records to find the unique cases
        for (i = 0, j = sArray.length; i < j; i = i + 1) {
            
            caseId = sArray[i].Case__c;
            console.log('CapacitySchedulesForUser.sArray[i].Case__c: ' + sArray[i].Case__c );
            sCases.push(caseId);
        }

        // find the unique CaseId values
        let casesSet = [...new Set(sCases)];
        uniqueCases = [...casesSet];

        // loop through uniqueCases and then schedules to find all the schedules for this caseId
        if (uniqueCases.length > 0) {
            for (i = 0, j = uniqueCases.length; i < j; i = i + 1) {
                thisCaseId = uniqueCases[i];
                schAry = [];
                // loop through schedules
                for (m = 0, n = sArray.length; m < n; m = m + 1) {
                    if (thisCaseId === sArray[m].Case__c) {
                        // push schedules into an array
                        schAry.push(sArray);
                    }
                }

                // create user/case schedules row
                this.createUserCaseSchdlRow(component, event, userId, thisCaseId, schAry)
            }
        } else {
            console.log('CapacitySchedulesForUser - no cases for this user and date range');
        }

    //  should this simply add the schedule records for each case into an array and create CapacitySchedulesForUserByCase.cmp ??
    //  or should this create the schedule{} objects, put them into array and create CapacitySchedulesForUserByCase.cmp  ??



    //  **********   Create hours for the cases and schedules

        // loop through days in week
        for (m = 0, o = datesInRange.length; m < o; m = m + 1) {
            
            //console.log('for date: ' + datesInRange[m]);
            hour = 0;
            schedule = {};

            //console.log('owner: ' + userId + ' - date: ' + datesInRange[m] + ' - total: ' + hour);

            if (sArray.length === 0) {
                schedule = {Date__c: datesInRange[m], Hours__c: hour, Class:"slds-input slds-text-align--center slds-theme--default"};
            }

            // set default schedule object
            schedule = {Date__c: datesInRange[m], Hours__c: hour, Class:"slds-input slds-text-align--center slds-theme--default"};

            

        if (uniqueCases.length > 3) {
            console.log('uniqueCases > 3');
        } else {
            // loop through cases
            /*
            for (y = 0, z = uniqueCases.length; y < z; i = i + 1) {
                var thisCase = uniqueCases[y];

                // loop through schedule__c records
                for (i = 0, j = sArray.length; i < j; i = i + 1) {
                    
                    var sDate = sArray[i].Date__c;
                    var sCase = sArray[i].Case__c;
                    var sCaseType = sArray[i].Case__r.Type;

                    console.log('CapacitySchedulesForUserByCase sCase: ' + sCase + ' - caseType: ' + sCaseType);
                    
                    //console.log(i + ' case type: ' + sArray[i].Case__r.Type + ' - hours: ' + hour + ' - sHour__c: ' + sArray[i].Hours__c + ' - sOwnerid: ' + sArray[i].OwnerId__c +  ' - rowOwnerId: ' + userId +' - datesInRange[m]: ' + datesInRange[m].toString() + ' - sDate.toString(): ' + sDate.toString() );
                    
                    // check if case = thisCase, and user is correct, and dates are within range
                    if ( thisCase === sCase && datesInRange[m].toString() === sDate.toString() && sArray[i].OwnerId__c === userId) {

                        //console.log('MATCH FOUND ON --> date: ' + datesInRange[m].toString() + ' - sDate: ' + sDate.toString() + ' - sOwnerId: ' + sArray[i].OwnerId__c + ' - userId: ' + userId);
                        if (sArray[i].Hours__c > 0) {

                            hour = hour + sArray[i].Hours__c;
                                
                            if (hour > 6) {
                                schedule = {Date__c: datesInRange[m], Hours__c: hour, Class:"slds-input slds-text-align--center slds-theme--error"};
                                    console.log('sOwner: ' + sArray[i].OwnerId__c + ' - date: ' + datesInRange[m] + ' - sDATE: ' + sArray[i].Date__c + ' - HOURS: ' + sArray[i].Hours__c + ' - total: ' + hour);
                            } else if (hour > 4) {
                                //hour = hour + sArray[i].Hours__c;
                                schedule = {Date__c: datesInRange[m], Hours__c: hour, Class:"slds-input slds-text-align--center slds-theme--warning"};
                                    console.log('sOwner: ' + sArray[i].OwnerId__c + ' - date: ' + datesInRange[m] + ' - sDATE: ' + sArray[i].Date__c + ' - HOURS: ' + sArray[i].Hours__c + ' - total: ' + hour);
                            } else if (hour > 0) {
                                //hour = hour + sArray[i].Hours__c;
                                schedule = {Date__c: datesInRange[m], Hours__c: hour, Class:"slds-input slds-text-align--center slds-theme--success"};
                                    console.log('sOwner: ' + sArray[i].OwnerId__c + ' - date: ' + datesInRange[m] + ' - sDATE: ' + sArray[i].Date__c + ' - HOURS: ' + sArray[i].Hours__c + ' - total: ' + hour);
                            } else {
                                //hour = hour + sArray[i].Hours__c;
                                schedule = {Date__c: datesInRange[m], Hours__c: hour, Class:"slds-input slds-text-align--center slds-theme--default"};
                                    console.log('sOwner: ' + sArray[i].OwnerId__c + ' - date: ' + datesInRange[m] + ' - sDATE: ' + sArray[i].Date__c + ' - HOURS: ' + sArray[i].Hours__c + ' - total: ' + hour);
                            }
                        }

                    } else {

                        //console.log('NO MATCH --> date: ' + datesInRange[m].toString() + ' - sDate: ' + sDate.toString() + ' - sOwnerId: ' + sArray[i].OwnerId__c + ' - userId: ' + userId);

                        //hour = 0;
                        //console.log('RESET total hours: ' + hour + ' - NEW schedule date: ' + datesInRange[m] + '--' + sArray[i].Date__c);
                    }
                } // end loop through schedule__c records

            }  // end loop through cases
        */
        }
            // push hours into an array
            //schAry.push(schedule);
        }

        //component.set("v.userHours", schAry);
    
    },

    // creates the user's schedules by case cmp
    createUserCaseSchdlRow : function (component, event, userId, caseId, scheduleRcds) {


        
        $A.createComponent(
            "c:CapacitySchedulesForUser",
            {
                "aura:id" : "cpctyUserCaseRow",
                "startDate" : component.get("v.startDate"),
                "daysToDisplay" : component.get("v.daysToDisplay"),
                "userId" : userId,
                "caseId" : caseId,
                "scheduleRcds" : scheduleRcds
            },
            function(newUserRow){
                if (component.isValid()) {
                    var body = component.get("v.body");
                    // remove the last component created; there can be only one!
                    //body.pop();
                    // add the new component
                    body.push(newUserRow);
                    console.log("CapacitySchedulesUsers.createUserSchdlRow");
                    component.set("v.body", body);
                }
            });
    }
})
