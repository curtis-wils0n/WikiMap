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
      $(`<li><a href="/maps/${map.id}" class="map">${map.title}</a> by <i>${map.name}</i> — "${map.description}"</li>`).appendTo($mapsList);
    }
  });
});
