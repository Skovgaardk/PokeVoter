CREATE table votes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    pokemon_1_id INT REFERENCES pokemon(id),
    pokemon_2_id INT REFERENCES pokemon(id),
    winner_id INT REFERENCES pokemon(id),
    vote_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);