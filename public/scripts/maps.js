// Render list of maps created
$(() => {
  $.ajax({
    method: 'GET',
    url: '/api/maps'
  })
  .done((response) => {
    const $mapsList = $('#maps');
    $mapsList.empty();
    for(const map of response.maps) {
      $(`<li id = "map_info"><a href="/maps/${map.id}" class="map">${map.title}</a> <i> by ${map.name} <br> "${map.description}"</li>`).appendTo($mapsList);
    }
  });
});
