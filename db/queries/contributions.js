const db = require('../connection');

const getContributionsById = (user_id) => {
  const queryString = `
  SELECT maps.* FROM maps
  FULL JOIN users ON users.id = owner_id
  FULL JOIN locations ON maps.id = map_id
  WHERE users.id = $1
  AND (owner_id = $1) OR (creator_id = $1)
  GROUP BY maps.id;`;
  const queryParams = [user_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getContributionsById,
};
