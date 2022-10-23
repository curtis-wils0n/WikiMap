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
    $(`<p class="title">T`).text('Title: ' + map.title).appendTo($mapDetails);
    $(`<p class="name">T`).text('By: ' + map.name).appendTo($mapDetails);
    $(`<p class="description">T`).text('Description: ' + map.description).appendTo($mapDetails);
    $(`<p class="created_date">T`).text('Created: ' + map.created_date).appendTo($mapDetails);
  });
});
