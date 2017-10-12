({
	doInit : function(component, event, helper) {
        var date = component.get("{!v.date}");
        var fDate = helper.getFormattedDate(date);
        //console.log('ScheduleCalDateCtrl * initial date: ' + date + ' - fDate: ' + fDate);
        
        var d = new Date();
        var today;// = d.setTime( d.getTime() - 1 * 86400000 );
        var fToday = helper.getFormattedDate(d);
        //console.log('ScheduleCalDateCtrl * today: ' + d + ' - formatted: ' + fToday);
        if (fDate === fToday) {
            console.log('ScheduleCalDateCtrl * this is today\'s date: ' + today);
            component.set("{!v.isToday}", true);
        } else {
            //console.log('ScheduleCalDateCtrl * date is not today * fDate: ' + fDate + 'fToday: ' + fToday);
            component.set("{!v.isToday}", false);
        }
        
        // set displayed date to formated date
        component.set("{!v.date}", fDate);
        
	}
})