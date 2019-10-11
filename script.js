//function for setting the day of the week
function todaysDate(){
  //Use Moment.js to call day of the week
  var currentDay = moment().format('dddd');
  var currentDate = moment().format('MMMM Do YYYY');
$('#currentDay').text(currentDay + ' ' + currentDate);
  //print to dom current day
}

//funtion for dynamically creating input fields 
function scheduleFields(){
  //clear when date changes
  //set each hour to the correct hour

  //when the save button is clicked, trigger save function
}

//function for setting to local storage
function saveInput(){
  
}

todaysDate();
scheduleFields();