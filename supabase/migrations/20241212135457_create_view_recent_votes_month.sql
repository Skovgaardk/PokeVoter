CREATE VIEW recent_votes_month AS
SELECT * 
FROM votes
WHERE vote_date >= NOW() - INTERVAL '1 month';