({
	doInit : function(component, event, helper) {
        
		var startDate = component.get("v.startDate"),
            daysToDisplay = component.get("v.daysToDisplay"),
        	weekdays = ["M","T","W","T","F","S","S"],
        	twoWeekdays = ["M","T","W","T","F","S","S","M","T","W","T","F","S","S"],
            fDate, y, m, d, datesInRange, showOptions, tglBtn;

        // hide options button to show/hide closed cases
        showOptions = component.get("v.showOptions");
        console.log("MyScheduleHeader.doInit showOptions:" + showOptions);
        if (showOptions === false) {
            tglBtn = component.find("toggleClosedCases_div");
            $A.util.removeClass(tglBtn,"slds-show");
            $A.util.addClass(tglBtn,"slds-hide");
            console.log("MyScheduleHeader.doInit showOptions:" + showOptions);
        } else {
            tglBtn = component.find("toggleClosedCases_div");
            $A.util.removeClass(tglBtn,"slds-hide");
            $A.util.addClass(tglBtn,"slds-show");
            console.log("MyScheduleHeader.doInit showOptions:" + showOptions);
        }
        
        // set start date to run the queries
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
	},

    toggleClosedCases : function(component, event, helper) {

        var showClosedCases = component.get("v.showClosedCases"),
            showClosedCasesLbl = component.get("v.showClosedCasesLabel"),
            newStatus;

        console.log('show Closed Cases was: ' + showClosedCases);

        if (showClosedCases == false) {
            component.set("v.showClosedCases",true);
            component.set("v.showClosedCasesLabel","Hide Closed Cases");

        } else {
            component.set("v.showClosedCases",false);
            component.set("v.showClosedCasesLabel","Show Closed Cases");
        }

        newStatus = component.get("v.showClosedCases");

        // need to fire an event here
        console.log('show Closed Cases changed to: ' + newStatus);

        var refreshTotalsEvent = component.getEvent("MyScheduleClosedCaseToggle");
        refreshTotalsEvent.setParam("showClosedCases", newStatus);
        refreshTotalsEvent.fire();

    }
})