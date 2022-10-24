// Client facing scripts here
$(() => {
  const map_id = $('#map-identifier').attr('value');
  const location_id = $('#location-identifier').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}/locations/${location_id}`
  })
  .then((response) => {
    const location = response.location;
    $('#title').html(`${location.title}`);
    $('#description').html(`${location.description}`);
    $('#image').attr("src", `${location.image_url}`);
    $('#image').attr("alt", `${location.description}`);
  });
});
