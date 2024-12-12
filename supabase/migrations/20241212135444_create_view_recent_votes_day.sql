CREATE VIEW recent_votes_day AS
SELECT * 
FROM votes
WHERE vote_date >= NOW() - INTERVAL '1 day';