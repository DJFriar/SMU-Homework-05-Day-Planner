$(document).ready(function() {

    var now = moment().format("dddd, MMMM Do YYYY");
    console.log("time is " + now);
    var currentHour24h = moment().format('H');

    // Set date in header area
    $("#currentDay").text(now);
    console.log(currentHour24h);

    // Data handling
    var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));
    if (storedEvents !== null) {
        eventArray = storedEvents;
    } else {
        eventArray = new Array(8);
        eventArray[4] = "Mmmmm ... food!"
    }
    console.log(eventArray);

    var plannerDiv = $("#planner");
    plannerDiv.empty();

    // Build the day planner
    for (var hour = 9; hour <= 17; hour++) {

        // draw the main rows
        var newRowDiv = $("<div>");
        newRowDiv.addClass("row");
        newRowDiv.attr("hour",hour);

        // draw the time section (column 1)
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

        // draw the text area (column 2)
        var rowIndex = hour - 9;
        var inputArea = $("<textarea>");
        inputArea.attr("id",`input-${ rowIndex }`);
        inputArea.attr("hour-index",rowIndex);
        inputArea.attr("class","description");
        inputArea.val(eventArray[rowIndex]);

        let descriptionCol = $("<div>");
        descriptionCol.addClass("col-md-9");

        newRowDiv.append(descriptionCol);
        descriptionCol.append(inputArea);

        // draw the save button (column 3)
        var saveButtonDiv = $("<div>");
        saveButtonDiv.attr("id",`saveID-${ rowIndex }`);
        saveButtonDiv.attr("saveID",rowIndex);
        saveButtonDiv.addClass("col-md-1 saveBtn");

        // add the icon
        var saveButton = $("<i>");
        saveButton.attr("class","far fa-save");

        newRowDiv.append(saveButtonDiv);
        saveButtonDiv.append(saveButton);

        // set row color based on time
        updateRowColor(newRowDiv, hour);

        // Push the row out to the browser window
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

    // handle the save button
    $(".saveBtn").on('click', function(event) {
        event.preventDefault();  
        
        var index = $(this).attr("saveID");
        var eventInfoID = "#input-" + index;
        var eventInfo = $(eventInfoID).val();

        // save to the data array
        eventArray[index] = eventInfo;
        localStorage.setItem("storedEvents", JSON.stringify(eventArray));
    });

});
