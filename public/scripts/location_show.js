//Render locations info placed on a map
$(() => {
  const map_id = $('#map-identifier').attr('value');
  const location_id = $('#location-identifier').attr('value');
  const user_id = $('#new-location').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}/locations/${location_id}`
  })
  .then((response) => {
    const location = response.location;
    const editForm = $(`#new-location`);
    const editToggle = $(`#toggleUpdateForm`);
    editToggle.hide();
    //Render main info and details accessible to anyone
    $('#title').html(`${location.title}`);
    $('#description').html(`${location.description}`);
    $('#image').attr("src", `${location.image_url}`);
    $('#image').attr("alt", `${location.description}`);
    //Render update features if viewer is creator of location
    const renderEdit = `
      <form id = 'newLocationForm' action = '/maps/<%= map_id %>/locations/<%= location_id%>' method = 'POST'>
        <label for="title">Location name:</label>
        <input type="text" name="title" placeholder="Location name" required/>
        <br>
        <label for="description">Location description:</label>
        <textarea type="text" name="description" placeholder="Location description" required></textarea>
        <br>
        <label for="locationImage">Image url:</label>
        <input type="url" name="locationImage" placeholder="Image URL link" required/>
        <br>
        <button type="submit" id="edit-button">Update</button>
        </form>
        <form id = 'deleteForm' method="POST" action="/maps/${map_id}/locations/${location.id}/delete">
        <button type="submit" class="btn btn-primary" id="delete-button">Delete</button>
        </form>`;
    if( location.creator_id == user_id || location.owner_id == user_id) {
      editForm.append(renderEdit);
      editToggle.show();
    };
  });
});
