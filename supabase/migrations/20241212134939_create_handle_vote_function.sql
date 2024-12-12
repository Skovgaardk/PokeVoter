CREATE OR REPLACE FUNCTION handle_vote(
    username TEXT,
    pokemon_1_id INT,
    pokemon_2_id INT,
    winner_id INT
)
RETURNS VOID AS $$
BEGIN
    -- Update Pokémon popularity
    UPDATE pokemon
    SET popularity = CASE 
        WHEN id = winner_id THEN popularity + 1
        WHEN id = CASE WHEN pokemon_1_id = winner_id THEN pokemon_2_id ELSE pokemon_1_id END THEN popularity - 1
        ELSE popularity
    END
    WHERE id IN (pokemon_1_id, pokemon_2_id);

    -- Insert the vote
    INSERT INTO votes (username, pokemon_1_id, pokemon_2_id, winner_id)
    VALUES (username, winner_id, 
            CASE WHEN winner_id = pokemon_1_id THEN pokemon_2_id ELSE pokemon_1_id END, 
            winner_id);
END;
$$ LANGUAGE plpgsql;


