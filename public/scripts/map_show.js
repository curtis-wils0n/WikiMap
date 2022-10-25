// Client facing scripts here
$(() => {
  const id = $('#identifier').attr('value');
  const userId = $('#favourite').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${id}`
  })
  .then((response) => {
    const map = response.map;
    const $mapDetails = $('#map-details');
    $mapDetails.empty();
    $(`<h1 class="title">`).text(map.title).appendTo($mapDetails);
    $(`<p class="name">`).text('By: ' + map.name).appendTo($mapDetails);
    $(`<p class="created_date">`).text('Created: ' + map.created_date).appendTo($mapDetails);
    $(`<p class="description">`).text('Description: ' + map.description).appendTo($mapDetails);
    // Google Maps render code
    let gMap = google.maps.Map;
    const mapOptions = {
      zoom: map.zoom,
      center: { lat: map.lat, lng: map.lng },
    };
    gMap = new google.maps.Map(
      document.getElementById('google-map'),
      mapOptions,
    );
    $.ajax({
      method: 'GET',
      url: `/api/maps/${id}/locations`,
    })
    .then((response) => {
      const locations = response.locations;
      for (const location of locations) {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          title: location.title,
        });
        marker.setMap(gMap);
      }
    })

  });

  //Change color of favourite icon based on status
  $.ajax({
    method: 'GET',
    url: `/api/favourites/${userId}`
  })
  .done((response) => {
    for (const favourite of response.favourites) {
      if (favourite.id == id ) {
        $('.fa-star').addClass('iconStarActive')
        break;
      }
    }
  });
  $('.fa-star').click(() => {
    //Unfavourite a map
    if ($('.fa-star').hasClass('iconStarActive')) {
      $('.fa-star').removeClass('iconStarActive');
      $('.fa-star').addClass('iconStarInactive');
    } else {
      //Favourite a map
      $('.fa-star').removeClass('iconStarInactive');
      $('.fa-star').addClass("iconStarActive");
    }
  })

  //Render locations posts placed by logged in user
  const renderLocations = (locations) => {
    const container = $(`#location-container`);
    container.empty();
    for (const location of locations) {
      const $location = `
      <p>${location.title}</p>
      <p>${location.description}</p>
      <p>${location.image_url}</p>
      <form method="GET" action="/maps/${id}/locations/${location.id}">
        <button type="submit">Edit</button>
      </form>
      <form method="POST" action="/maps/${id}/locations/${location.id}/delete">
        <button type="submit" class="btn btn-primary">Delete</button>
      </form>`;
      container.append($location);
    }
  };

  const loadLocations = () => {
    $.ajax({
      method: 'GET',
      url: `/api/locations/maps/${id}`
    })
    .then((response) => {
      renderLocations(response.locations);
    })
  }
  loadLocations();
});


