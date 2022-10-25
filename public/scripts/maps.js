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
      $(`<li><a href="/maps/${map.id}" class="map">${map.title}</a> <i>by ${map.name}</i></li>`).appendTo($mapsList);
    }
  });
});
