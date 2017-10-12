({
    doInit : function(component, event, helper) {
        
        var d = new Date(), year, month, day, fDate, initDate;

        console.log('CaseSchedules.doInit caseid: ' + component.get("v.recordId"));
		
        if (component.get("v.startDate") != null) {
            fDate = component.get("v.startDate");
            //fDate = helper.getStartingMonday(component,fDate);
            //console.log('CaseSchedules.doInit * start date already exists, here is the starting Monday: ' + fDate);
        } else {
            // component just initalized so no date yet.
            d = helper.getStartingMonday(component,d);
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();
            month = month.toString().length === 2 ? month : 0 + month.toString();
            day = day.toString().length === 2 ? day : 0 + day.toString();
            
            fDate = year + "-" + month + "-" + day;
            
            //console.log('CaseSchedules.doInit * starting Monday: ' + fDate);
        }
                
        component.set("v.startDate",fDate);
        
        helper.init(component, event);
	},
    
    changeDate : function (component, event, helper) {
        
        var source = event.getSource().getLocalId(),
        	startDate = component.get("v.startDate"),
            daysToIncrement, d, year, month, day, y, m, d, fDate;
        
        //console.log('CaseSchedules.changeDate source: ' + source + ' - startDate: ' + startDate);
        
        // set the number of days to move the calendar
        if (source === 'btn_nextWk') {
            daysToIncrement = 7;
        } else if (source === 'btn_prevWk') {
            daysToIncrement = -7;
        }
        
        // increment the date and set startDate to the new date
        if (startDate.length === 10 && source != undefined) {
            
            // convert startDate (eg. 2017-03-20) into correct format to increment
            year = startDate.slice(0,4);
        	month = startDate.slice(5,7) - 1;
        	day = startDate.slice(8,10);
            
            // increment date
            d = new Date(year,month,day);
            d.setDate(d.getDate() + daysToIncrement);
                        
            // convert back to yyyy-mm-dd format
            //fDate = helper.dateFormatToYMD(d);
            
            y = d.getFullYear();
            m = d.getMonth() + 1;
            d = d.getDate();
            m = m.toString().length === 2 ? m : 0 + m.toString();
            d = d.toString().length === 2 ? d : 0 + d.toString();
            
            fDate = y + "-" + m + "-" + d;
            
            // set the startDate variable
            component.set("v.startDate",fDate);
            
            // refresh the calendar
            helper.init(component, event);
        } else {
            console.log('CaseSchedules.changeDate: cmp was refreshed or wrong date format -> ' + startDate);
        }

        
        
    }
    
})