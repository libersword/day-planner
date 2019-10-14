//function for setting the day of the week
function todaysDate() {
  //Use Moment.js to call day of the week
  var currentDay = moment().format("dddd");
  var currentDate = moment().format("MMMM Do YYYY");
  $("#currentDay").text(currentDay + " " + currentDate);
  //print to dom current day
}
//funtion for dynamically creating input fields
function displayNewSchedule() {
  //for loop to loop through 9 to 5 in 24 hour format
  for (var i = 9; i < 18; i++) {
    var block = $('<div class="time-block"></div>');
    var row = $('<div class="row"></div>');
    var hour = $('<div class="hour"></div>');
    var description = $('<textarea class="description"></textarea> ');
    var saveBtn = $('<button class="saveBtn">Save</button>');
    //set the data attribute sub index to 24 hour format
    hour.attr("data-hour", i);
    //set the text to sub index to 
    hour.text(
      moment()
        .hour(i)
        .format("h A")
    );
    //append everything together
    row.append(hour, description, saveBtn);
    block.append(row);
    $(".container").append(block);
  }
}
//on document ready
$(document).ready(function() {
  //on button save, set item into local storage
  $(".saveBtn").on("click", function() {
    //save THIS input and time based on data hour attr into local storage
    var scheduleInput = $(this)
      .siblings(".description")
      .val();
    var time = $(this)
      .siblings(".hour")
      .attr("data-hour");
      //set the key value pairs based on these inputs, with unique identifier
    localStorage.setItem("val-" + time, scheduleInput);
  });
});
//function to render schedule and pulling down the items from local storage and setting them as text and data attribute to textarea
function getSchedule() {
  //for each timeblock, pass through an index
  $(".time-block").each(function(i) {
    //save that index as a variable plus 9 to match the data attributes on the hour
    var hourIndex = i + 9;
    //save the localstorage with the unique identifier to a variable
    var saved = localStorage.getItem("val-" + hourIndex);
    //set the variable for the color of the blocks
    var colorBasedonTime =  
    $(this)
    .find(".hour")
    .attr("data-hour", hourIndex)
    .siblings(".description");
    //if saved is NOT empty
    if (saved !== null) {
      //set the text from the local storage
      $(this)
        .find(".hour")
        .attr("data-hour", hourIndex)
        .siblings(".description")
        .text(saved);
    }
    //else nothing
    //if the hour index is equal to the current hour
    if (hourIndex === moment().format('H')){
      //give class present
      colorBasedonTime.attr('class', 'description present');
      //else if hour is GREATER than current hour
    }else if(hourIndex > moment().format('H')){
      //set time to the future
      colorBasedonTime.attr('class', 'description future');
    }else{
      //else it must be in the past so set to the past
      colorBasedonTime.attr('class', 'description past');
    }
  });
}
//call all the functions!
todaysDate();
displayNewSchedule();
getSchedule();
