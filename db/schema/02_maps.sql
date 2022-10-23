-- Drop and recreate Maps table (Example)

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_date DATE,

  zoom INTEGER NOT NULL,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL
);
