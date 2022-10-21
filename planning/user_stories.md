# User Stories for Wiki Map

As a user, I want to be able to...
- ...*create* interactable maps with other authenticated users, *because* I want to share and see other people's opinions
- ...*create* private maps that only I can edit, *because* I want a personal reminder of places I want to go
- ...*create* a map with multiple points, *because* I want these locations to be categorized by a common theme
- ...*create* a point on a map with a title, description, and image, *because* it gives me a better idea of what the location is
- ...*create* a profile where I can display my favourite maps and people can see public maps that I've contributed to, *because* I like to be social
- ...*edit* maps that I have access too, *because* I might change my mind
- ...*see* a list of viewable maps, *because* I want to explore new places
- ...*view* a single map, *because* I want to see more details (i.e., what the map was created for)
- ...*save* maps I want to come back to, *because* I might need to refer to it in the future

// BROWSE

Seeing a list of viewable maps
- GET '/maps'

See a list of locations on a map
- GET '/maps/:map_id/locations

// READ

Viewing a single map
- GET '/maps/:map_id'

View location details
- GET '/maps/:map_id/locations/:location_id'

View profile
- GET '/users/:id'

// EDIT

Modifying locations on existing maps
- PUT '/maps/:map_id/locations/:location_id'

// ADD

Create map
- POST '/maps'

Create location
- POST '/maps/:map_id/locations'

Create favourite (aka append map to favourite list)
- POST '/users/:user_id/favourites?map_id=x'

Stretch: Create user
- POST '/users'

// DELETE

Remove locations from maps
- DELETE '/maps/:map_id/locations/:location_id'

Remove maps that I created
- DELETE '/maps/:map_id'

Remove map from favourites
- DELETE '/users/:user_id/favourites?map_id=x'

MVP
- Being able to create a map and add pins to it that others can see
  - Modify/delete a map you have created
- Being able to see other public maps and view them individually
MVD
- Show a list of pre-made maps
- Create a map with locations
