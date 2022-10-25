// Client facing scripts here



//Search for places API
let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
      {
        types: ['establishment'],
        componentRestrictions: {'country': ['ca']},
        fields: ['place_id', 'geometry', 'name']
      });
  };

autocomplete.addListern

function placeChanged() {
  let place = autocomplete.getPlace();

  if (!place.geometry) {
    document.getElementById('autocomplete').placeholder = 'Enter a place';
  } else {
    document.getElementById('details').innerHTML = place.name;
  }
}
