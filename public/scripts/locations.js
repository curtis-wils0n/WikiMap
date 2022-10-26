//Render list of locations for a map
$(() => {
  const map_id = $('#identifier').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}/locations`
  })
  .done((response) => {
    const $locationsList = $('#locations');
    const $mapListTitle = $('#map-list-title');
    $locationsList.empty();
    $mapListTitle.empty();
    for (const location of response.locations) {
      $(`<li><a href="/maps/${map_id}/locations/${location.id}" class="location">${location.title}</a>`).appendTo($locationsList);
    }
    $mapListTitle.text('Locations from map: ' + response.locations[0].map_title);
  });
});
