// Render all information about the map
$(document).ready(function() {
  //Animation to show and hide new location form on click of icon
  $("#toggleLocFormButton").click(() => {
    $('#newLocationForm').slideToggle();
  });

//Initially hide desired content
  $('#newLocationForm').hide();
});
