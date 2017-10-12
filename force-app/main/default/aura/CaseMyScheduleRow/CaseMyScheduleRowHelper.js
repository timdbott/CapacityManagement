({
    getFormattedDate : function(dateToFormat) {
        
        var d = new Date(dateToFormat),
            year, month, day, formattedDate;
        	
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
        
        //console.log('day length: ' + day.toString().length + ' - toString: ' + day.toString());
        
        month = month.toString().length === 2 ? month : 0 + month.toString();
        day = day.toString().length === 2 ? day : 0 + day.toString();
        
        formattedDate = year + "-" + month + "-" + day;
               
        return formattedDate;
	},
    
    getWeekDates : function(component, startDate) {
        
        var numOfDays = component.get("v.daysToDisplay"), 
            datesInWeek = [],
            d, day, diff, monday, nextDay, newDate, i, j;
        
        d = new Date(startDate);
        
        if (startDate === null) {
            startDate = new Date();
        }
        
        if (numOfDays === undefined) {
            numOfDays = 7;
        }
            
        // find day # of the week ('0' = sunday)
        day = d.getDay();
        
        // find day # of month
        diff = d.getDate() - day + (day == 0 ? -7 : 0); // adjust when day is sunday
        
            	// find sunday
            	//sunday = new Date(d.setDate(diff)),
            	
        //find monday
        monday = new Date(d.setDate(diff + 1));
        
        for (i = 0, j = numOfDays; i < j; i = i + 1) {
			
            nextDay = new Date(monday.valueOf());
            nextDay = nextDay.setDate(nextDay.getDate() + i);
            newDate = new Date(nextDay);
            //console.log(i + ' - next day: ' + newDate);
            //console.log('* getWeekDates * next day formatted: ' + this.getFormattedDate(nextDay));
            
            
            datesInWeek.push(newDate);
            //nextDay = this.getFormattedDate(nextDay);
            //datesInWeek.push(nextDay);
        }
                
        return datesInWeek;
    }
})