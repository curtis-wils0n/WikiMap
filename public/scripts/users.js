// Client facing scripts here
$(() => {
  $.ajax({
    method: 'GET',
    url: '/api/users'
  })
  .done((response) => {
    const $usersList = $('#users');
    $usersList.empty();
    for(const user of response.users) {
      $(`<li class="user">`).text(user.name).appendTo($usersList);
    }
  });
  //Favourite map loader
  const user_id = $('#favourite-container').attr('value');
  const renderFavourites = (favourites) => {
    const container = $('#favourite-container')
    container.empty();
    for (const favourite of favourites) {
      const $favourite = `<p>${favourite.title}</p>`
      container.append($favourite);
    }
  };

  const loadFavourites = () => {
    $.ajax({
      method: 'GET',
      url: `/api/favourites/${user_id}`
    })
    .then ((response) => {
      renderFavourites(response.favourites);
    })
  }
  loadFavourites();

  //Contribution map loader
  const renderContributions = (contributions) => {
    const container = $('#contribution-container')
    container.empty();
    for (const contribution of contributions) {
      const $contribution = `<p>${contribution.title}</p>`
      container.append($contribution);
    }
  };

  const loadContributions = () => {
    $.ajax({
      method: 'GET',
      url: `/api/contributions/${user_id}`
    })
    .then ((response) => {
      renderContributions(response.contributions);
    })
  }
  loadContributions();
});
