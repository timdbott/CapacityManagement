({
    getWeekDates : function(component, startDate) {
        
        var numOfDays = component.get("v.daysToDisplay"), 
            datesInWeek = [],
            d, day, diff, monday, nextDay, newDate, i, j;
        
        console.log('ScheduleCalHeaderHlpr * numOfDays: ' + numOfDays);
        
        d = new Date(startDate);
        
        if (startDate === null) {
            startDate = new Date();
        }
            
        // find day # of the week ('0' = sunday)
        day = d.getDay();
        
        // find day # of month
        diff = d.getDate() - day + (day === 0 ? -7 : 0); // adjust when day is sunday
        
            	// find sunday
            	//sunday = new Date(d.setDate(diff)),
            	
        //find monday
        monday = new Date(d.setDate(diff + 1));
        
        for (i = 0, j = numOfDays; i < j; i = i + 1) {
			
            nextDay = new Date(monday.valueOf());
            nextDay = nextDay.setDate(nextDay.getDate() + i);
            newDate = new Date(nextDay);
            //console.log(i + ' - next day: ' + newDate);
            //console.log('next day formatted: ' + this.getFormattedDate(nextDay));
            
            
            datesInWeek.push(newDate);
            //nextDay = this.getFormattedDate(nextDay);
            //datesInWeek.push(nextDay);
        }

        return datesInWeek;
    }
})