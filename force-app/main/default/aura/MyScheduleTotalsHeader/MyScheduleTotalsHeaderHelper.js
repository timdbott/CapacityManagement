({
    getWeekDates : function(component, startDate) {
        
        var numOfDays = component.get("v.daysToDisplay"), 
            datesInWeek = [],
            d, day, diff, monday, nextDay, newDate, i, j;
        
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
                
        // loop through numofdays and push dates in array
        for (i = 0, j = numOfDays; i < j; i = i + 1) {
			
            nextDay = new Date(monday.valueOf());
            nextDay = nextDay.setDate(nextDay.getDate() + i);
            newDate = new Date(nextDay);

            datesInWeek.push(newDate);
        }

        return datesInWeek;
    }
})