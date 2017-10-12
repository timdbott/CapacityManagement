({
    getFormattedDate : function(dateToFormat) {
        
        var d = new Date(dateToFormat),
            monthTxt = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            year, month, day, formattedDate;
        
        //console.log('ScheduleCalDateHlpr * getFormattedDate * dateToFormat: ' + dateToFormat + ' d: ' + d);;
        	
        year = d.getFullYear();
        month = d.getMonth();
        //month = d.getMonth() + 1;
        day = d.getDate();
        
        //console.log('ScheduleCalDateHlpr * getFormattedDate * date: ' + d + ' day: ' + day);
        
        //month = month.toString().length === 2 ? month : 0 + month.toString();
        day = day.toString().length === 2 ? day : 0 + day.toString();
        
        formattedDate = monthTxt[month] + " " + day;
        //formattedDate = year + "-" + month + "-" + day;
               
        return formattedDate;
	}
})