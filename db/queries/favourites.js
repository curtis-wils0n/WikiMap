const db = require('../connection');

const newFavourite = (inputs) => {
  const queryString = `
  INSERT INTO favourites (owner_id, map_id)
  VALUES ($1,$2) RETURNING *;`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

const deleteFavourite = (inputs) => {
  const queryString = `
  DELETE FROM favourites
  WHERE owner_id = $1 AND map_id= $2;`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

const getFavourites = () => {
  return db.query('SELECT * FROM favourites;')
    .then(data => {
      return data.rows;
    });
};

const getFavouritesById = (user_id) => {
  const queryString = `
  SELECT maps.title, maps.id FROM favourites JOIN maps ON maps.id = map_id WHERE favourites.owner_id = $1`
  const queryParams = [user_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const checkFavouritesExist = (inputs) => {
  const queryString = `
  SELECT * FROM favourites WHERE owner_id = $1 AND map_id = $2`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data.rows);
      return (data.rows.length !== 0);
    });
}

module.exports = {
  getFavourites,
  getFavouritesById,
  newFavourite,
  checkFavouritesExist,
  deleteFavourite,
};
