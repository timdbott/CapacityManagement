({

	init : function(component, event) {

		var scheduleRcds = component.get("v.scheduleRcds"),
			tm = component.get("v.teamMember"),
			startDate = component.get("v.startDate"),
            daysToDisplay = component.get("v.daysToDisplay"),
            datesInRange = [],
            scheduleRcdsForTM = [],
            schAry = [],
            hour, schedule, i, j, m, o;

        // put all the dates for this range into an array
        if (startDate != null || startDate != undefined) {

            datesInRange = this.getWeekShortDates(component,startDate);
        }
			
        // if we have schedules then loop through them to find the date matches
		if (scheduleRcds === null || scheduleRcds === undefined) {
			console.log('CapacityScheduleCaseAllTeamHrs.init: nothing in scheduleRcds');
			// do nothing
		} else {

			scheduleRcdsForTM = this.filterSchedules(scheduleRcds,tm);

			console.log('CapacityScheduleCaseAllTeamHrs.init: datesInRange: ' + datesInRange.length);

			// loop through dates
			for (m = 0, o = datesInRange.length; m < o; m = m + 1) {
				hour = 0;
                //schedule = {};

                schedule = {Date__c: datesInRange[m], Hours__c: hour};
                
                // loop through scheduleRcdsForTM records
                 for (i = 0, j = scheduleRcdsForTM.length; i < j; i = i + 1) {
                   
                    sDate = scheduleRcdsForTM[i].Date__c;

                    
                    //console.log(i + 'hours: ' + hour + ' - sdate: ' + sDate + ' - id: ' + scheduleRcdsForTM[i].Id + ' - datesInRange[m]: ' + datesInRange[m] );
                      
                    if ( datesInRange[m].toString() === sDate.toString() ) {
                        if (scheduleRcdsForTM[i].Hours__c > 0) {
                            hour = hour + scheduleRcdsForTM[i].Hours__c;
                            //console.log('date: ' + datesInRange[m] + ' - sDATE: ' + scheduleRcdsForTM[i].Date__c + ' - HOURS: ' + scheduleRcdsForTM[i].Hours__c + ' - total: ' + hour);
                            schedule = {Date__c: datesInRange[m], Hours__c: hour};

                        }

                    } 
                    
                }
                schAry.push(schedule);

                for (var k = 0, r = schAry.length; k < r; k++) {
                	//console.log('schAry : ' + schAry[k].Hours__c + ' - ' +schAry[k].Date__c);
                }
			}

			component.set("v.scheduleRcdsForTM", schAry);
		} // end null check for scheduleRcds

	},

	// find just the schedules for this team member (tm)
	filterSchedules : function (schedules, tm) {
		// schedules is an array of objects
		// tm is a string of the Team Member's name

		var filteredArray = [],
			i, j, schedule;

		for (i = 0, j = schedules.length; i < j; i = i +1) {

			//console.log('check hours & dates for: ' + tm + ' - ' + schedules[i].Owner.Name + ' - ' + schedules[i].Date__c + ' - ' + schedules[i].Hours__c);


			if (schedules[i].OwnerId__r.Name === tm) {
				schedule = {Date__c: schedules[i].Date__c, Hours__c: schedules[i].Hours__c};
				filteredArray.push(schedule);
			}
		}

		return filteredArray;
	},

	// get the dates for this week in short date format
	getWeekShortDates : function(component, startDate) {
                
        var numOfDays = component.get("v.daysToDisplay"), 
            year, month, day, d, day, diff, monday, nextDay, 
            newDate, i, j, yr, mo, dy, shortDate, sunday, formattedDateHeader,
            datesInWeek = [];
        
        console.log('capacityscheduleallrowhlpr * startDate: ' + startDate);
        
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
            
            console.log('CSAllRowHlpr * startDate: ' + startDate + ' - short date: ' + shortDate + ' -d: ' + d);
			
            datesInWeek.push(shortDate);
        }

        return datesInWeek;
    },

	// formats a js date to MMM dd
    dateFormatToMD : function(dateToFormat) {
        
        var m, d, fDate;
        	
        if (dateToFormat != undefined && dateToFormat != null) {
           
            m = dateToFormat.toString().slice(4,8);
            d = dateToFormat.getDate();
            
            fDate = m + " " + d;
        }
        
        return fDate;
	}
})