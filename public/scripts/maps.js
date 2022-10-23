// Client facing scripts here
$(() => {
  $('#fetch-maps').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/maps'
    })
    .done((response) => {
      const $mapsList = $('#maps');
      $mapsList.empty();

      for(const map of response.maps) {
        $(`<li class="map">`).text(map.name).appendTo($mapsList);
      }
    });
  });
});
