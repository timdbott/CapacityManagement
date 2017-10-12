({
	doInit : function(component, event, helper) {
        
		var startDate = component.get("v.startDate"),
            daysToDisplay = component.get("v.daysToDisplay"),
        	weekdays = ["M","T","W","T","F","S","S"],
        	twoWeekdays = ["M","T","W","T","F","S","S","M","T","W","T","F","S","S"],
            fDate, y, m, d, datesInRange;
        
        if (startDate === null) {
            startDate = new Date();
            console.log('ScheduleCalHedrCntrl * startDate: ' + startDate);
        }
        
        if (daysToDisplay === undefined) {
            daysToDisplay = 7;
        }
                
        if (startDate === undefined) {
        	// do nothing in order to keep the dates unchanged
        } else if (startDate.length > 5) {
            y = startDate.slice(0,4);
            m = startDate.slice(5,7) - 1;
            d = startDate.slice(8,10);
            
            console.log('ScheduleCalHedrCntrl * y: ' + y + ' - m: ' + m + ' - d: ' + d);
            
            fDate = new Date(y,m,d);
            
            datesInRange = helper.getWeekDates(component, fDate);
            
            component.set("v.dates", datesInRange);
            
            if (daysToDisplay === 7) {
                component.set("v.weekdays", weekdays);
            } else if (daysToDisplay === 14) {
                component.set("v.weekdays", twoWeekdays);
            }  
        
        }
	}
})