const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      return data.rows;
    });
};

const getMapsById = (map_id) => {
  const queryString = `
  SELECT *, users.name as name FROM maps
  JOIN users ON maps.owner_id = users.id
  WHERE maps.id = $1;
  `
  const queryParams = [map_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};

module.exports = {
  getMaps,
  getMapsById,
};
