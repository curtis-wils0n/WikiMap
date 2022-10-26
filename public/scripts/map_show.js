// Render all information about the map


$(document).ready(function() {
  const id = $('#identifier').attr('value');
  const userId = $('#favourite').attr('value');
  const mapDesign = $('#google-map').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${id}`
  })
  .then((response) => {
    const map = response.map;
    const $mapDetails = $('#map-details');
    const $mapEditer = $(`#map-editer`);
    $mapDetails.empty();

    //Map details
    let updateFeature = `<form method="GET" action="/maps/${id}/update">
    <button type="submit">Edit</button>
    </form>
    <form method="POST" action="/maps/${id}/delete">
      <button type="submit" class="btn btn-primary">Delete</button>
    </form>`;
    $(`<h1 class="title">`).text(map.title).appendTo($mapDetails);
    $(`<p class="name">`).text('By: ' + map.name).appendTo($mapDetails);
    $(`<p class="created_date">`).text('Created: ' + timeago.format(map.created_date)).appendTo($mapDetails);
    $(`<hr/>`).appendTo($mapDetails);
    $(`<p class="description">`).text(map.description).appendTo($mapDetails);
    //Render edit/delete feature if owner of map
    if (map.owner_id == userId){
      $mapEditer.append(updateFeature);
    };

    // Google Maps render code
    let gMap = google.maps.Map;
    const mapOptions = {
      zoom: map.zoom,
      center: { lat: map.lat, lng: map.lng },
      mapId: mapDesign
    };
    gMap = new google.maps.Map(
      document.getElementById('google-map'),
      mapOptions,
    );

    //Render locations for the specific map
    $.ajax({
      method: 'GET',
      url: `/api/maps/${id}/locations`,
    })
    .then((response) => {
      const locations = response.locations;
      //Image data for google markers
      var image = {
        url: "https://img.icons8.com/emoji/48/000000/round-pushpin-emoji.png", // url
        scaledSize: new google.maps.Size(40, 40), // size
      }
      for (const location of locations) {
        const contentString = `
        <div id="content">
          <div id="siteNotice">
          </div>
          <h1 id="firstHeading" class="firstHeading">${location.title}</h1>
          <div id="bodyContent">
            <p>${location.description}</p>
            <img src="${location.image_url}" style="width: 200px;">
          </div>
        </div>`;

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: location.title,
        });
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          title: location.title,
          icon: image
        });

        marker.setMap(gMap);
        marker.addListener('click', () => {
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
      };

      //User event for placing 1 marker at a time for new markers
      const tempMarker = new google.maps.Marker({
        position: { lat: 0, lng: 0},
        icon: image,
      });
      gMap.addListener('click', (data) => {
        let lat = data.latLng.lat();
        let lng = data.latLng.lng();
        tempMarker.setPosition(data.latLng);
        tempMarker.setMap(gMap);
        document.getElementById('lat-location').setAttribute('value', lat);
        document.getElementById('lng-location').setAttribute('value', lng);
      })

      //Implement search bar for places for google map
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'), {
        componentRestrictions: {'country': ['ca']},
        fields: ['geometry', 'name'],
        types: ['establishment']
      })
      autocomplete.bindTo('bounds',gMap);
      autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        gMap.fitBounds(place.geometry.viewport);
        gMap.setZoom(19);
      })
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
      <img src="${location.image_url}" style="width:50%;"/>
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

  //Render others marker info to delete if user is admin of map
  const renderOtherLocations = (locations) => {
    const container = $(`#admin-container`);
    container.empty();
    for (const location of locations) {
      const $location = `
      <p>${location.title}</p>
      <p>${location.description}</p>
      <img src="${location.image_url}" style="width:50%;"/>
      <form method="POST" action="/maps/${id}/locations/${location.id}/delete">
        <button type="submit" class="btn btn-primary">Delete</button>
      </form>`;
      container.append($location);
    }
  };
  const loadOtherLocations = () => {
    $.ajax({
      method: 'GET',
      url: `/api/locations/maps/${id}/admin`
    })
    .then((response) => {
      renderOtherLocations(response.locations);
    })
  }
  loadOtherLocations();
});



