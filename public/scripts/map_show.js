// Client facing scripts here
$(() => {
  const id = $('#identifier').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${id}`
  })
  .done((response) => {
    const map = response.map;
    const $mapDetails = $('#map-details');
    $mapDetails.empty();
    $(`<h1 class="title">`).text(map.title).appendTo($mapDetails);
    $(`<p class="name">`).text('By: ' + map.name).appendTo($mapDetails);
    $(`<p class="created_date">`).text('Created: ' + map.created_date).appendTo($mapDetails);
    $(`<p class="description">`).text('Description: ' + map.description).appendTo($mapDetails);
    // google maps code
  });
});

// code here
