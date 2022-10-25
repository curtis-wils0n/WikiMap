// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource

//User related routes
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');

//Map related routes
const mapsApiRoutes = require('./routes/maps-api');
const mapsRoutes = require('./routes/maps');

//User to map relation Routes
const locationsApiRoutes = require('./routes/locations-api');
const favouritesApiRoutes = require('./routes/favourites-api');
const contributionsApiRoutes = require('./routes/contributions-api');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

//User related routes mount
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);

//Map related routes mount
app.use('/api/maps', mapsApiRoutes);
app.use('/maps', mapsRoutes);

//User to map relation routes mount
app.use('/api/locations', locationsApiRoutes);
app.use('/api/favourites', favouritesApiRoutes);
app.use('/api/contributions', contributionsApiRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const templateVars = {user_id: req.cookies['user_id']};
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
