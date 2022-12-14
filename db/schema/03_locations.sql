-- Drop and recreate Maps table (Example)

DROP TABLE IF EXISTS locations CASCADE;
CREATE TABLE locations (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),

  -- google api values
  lat FLOAT,
  lng FLOAT,
  created_date DATE
);
