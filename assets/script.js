$(document).ready(function() {
    var now = moment().format("dddd, MMMM Do YYYY");
    console.log(now);
    var currentHour24h = 0;

    // Set date in header area
    $("#currentDay").text(now);
    console.log(moment().format('h'));

    // Data handling
    var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));
    if (storedEvents !== null) {
        eventArray = storedEvents;
    } else {
        eventArray = new Array(8);
        eventArray[4] = "Mmmmm ... food!"
    }

    var plannerDiv = $("#planner");
    plannerDiv.empty();

    // Build the day planner
    for (var hour = 9; hour <= 17; hour++) {

        // Rows
        var newRowDiv = $("<div>");
        newRowDiv.addClass("row");
        newRowDiv.attr("hour",hour);

        // Time section
        var timeCol = $("<div>");
        timeCol.addClass("col-md-2 hour");

        var amPM = "";
        if (hour > 12) {
            displayHour = hour - 12;
            amPM = "pm";
        } else {
            displayHour = hour;
            amPM = "am";
        }

        timeCol.text(`${ displayHour }${ amPM }`);
        newRowDiv.append(timeCol);

        // Text area
        var rowIndex = hour - 8;
        var inputArea = $("<textarea>");
        inputArea.attr('id',`input-${rowIndex}`);
        inputArea.attr('hour-index',rowIndex);
        inputArea.attr('class','description');
        inputArea.val(eventArray[rowIndex]);

        let descriptionCol = $("<div>");
        descriptionCol.addClass("col-md-9");

        newRowDiv.append(descriptionCol);
        descriptionCol.append(inputArea);

        // Save Button
        var saveButtonDiv = $("<div>");
        saveButtonDiv.addClass("col-md-1 saveBtn");

        var saveButton = $("<i>");
        saveButton.attr("id",`save-id-${rowIndex}`);
        saveButton.attr('save-id',rowIndex);
        saveButton.attr('class',"far fa-save");

        newRowDiv.append(saveButtonDiv);
        saveButtonDiv.append(saveButton);

        // set row color based on time
        updateRowColor(newRowDiv, hour);

        plannerDiv.append(newRowDiv);
    }

    function updateRowColor(rowHour,hour) {
        if (hour < currentHour24h) {
            rowHour.addClass("past");
        } else if (hour > currentHour24h) {
            rowHour.addClass("future");
        } else {
            rowHour.addClass("present");
        }
    };

});
