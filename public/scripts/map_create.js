
//Get lat and lng of searched places
$(document).ready(function() {
  let autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'), {
    componentRestrictions: {'country': ['ca']},
    fields: ['geometry', 'name'],
    types: ['(cities)']
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    document.getElementById('lat-location').setAttribute('value', lat);
    document.getElementById('lng-location').setAttribute('value', lng);
  });
});
