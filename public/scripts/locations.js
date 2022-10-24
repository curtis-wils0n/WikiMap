// Client facing scripts here
$(() => {
  const map_id = $('#identifier').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}/locations`
  })
  .done((response) => {
    const $locationsList = $('#locations');
    $locationsList.empty();

    for (const location of response.locations) {
      $(`<li class='location'>`).text(location.title).appendTo($locationsList);
    }
  });
});
