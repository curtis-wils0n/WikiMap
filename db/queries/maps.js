const db = require('../connection');

const getMaps = () => {
  return db.query(`
  SELECT maps.*, users.name AS name FROM maps
  JOIN users ON users.id = maps.owner_id;
  `)
    .then(data => {
      return data.rows;
    });
};

const getMapsById = (map_id) => {
  const queryString = `
  SELECT *, users.name as name FROM maps
  JOIN users ON maps.owner_id = users.id
  WHERE maps.id = $1;`
  const queryParams = [map_id]
  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows)
      return data.rows[0];
    });
};

const newMap = (inputs) => {
  const queryString = `
  INSERT INTO maps (owner_id, title, description,created_date, zoom, lat, lng)
  VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

const updateMap = (inputs) => {
  const queryString = `
  UPDATE maps
  SET title= $2, description = $3, zoom = $4, lat = $5, lng = $6
  WHERE maps.id = $1 ;`
  const queryParams = inputs
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const deleteMap = (inputs) => {
  const queryString = `
  DELETE FROM maps
  WHERE id = $1;`
  const queryParams = inputs;
  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

module.exports = {
  getMaps,
  getMapsById,
  newMap,
  updateMap,
  deleteMap,
};
