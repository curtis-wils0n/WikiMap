const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUser = (userId) => {
  return db.query('SELECT * FROM users WHERE users.id = $1;',[userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUser };
