// Render all information about the map
$(document).ready(function() {
  //Animation to show and hide edit location form on click of icon
  $("#toggleLocFormButton").click(() => {
    $('#new-location').slideToggle();
  });

//Initially hide desired content
  $('#new-location').hide();
});
