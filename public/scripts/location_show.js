//Render locations info placed on a map
$(() => {
  const map_id = $('#map-identifier').attr('value');
  const location_id = $('#location-identifier').attr('value');
  const user_id = $('#newLocationForm').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}/locations/${location_id}`
  })
  .then((response) => {
    const location = response.location;

    //Render main info and details accessible to anyone
    $('#title').html(`${location.title}`);
    $('#description').html(`${location.description}`);
    $('#image').attr("src", `${location.image_url}`);
    $('#image').attr("alt", `${location.description}`);
    //Render update features if viewer is creator of location
    if( location.creator_id == user_id) {
      const renderEdit = ` <div>
      <fieldset>
        <legend>Update location</legend>
        <label for="title">Location name:</label>
        <input type="text" name="title" placeholder="Location name" required/>
        <br>
        <label for="description">Location description:</label>
        <textarea type="text" name="description" placeholder="Location description" required></textarea>
        <br>
        <label for="locationImage">Image url:</label>
        <input type="url" name="locationImage" placeholder="Image URL link" required/>
        <br>
        <button type="submit">Update</button>
      </fieldset>
    </div>`;
    $(`#newLocationForm`).append(renderEdit);
    };
  });
});
