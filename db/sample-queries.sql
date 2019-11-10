USE TRUSL;

-- Select all bids on a listing
SELECT * from bids WHERE listing_id=1;

-- Select all active listings for a consumer
SELECT * FROM listings WHERE poster_id=1;

-- Select all listings for a consumer order by bid_status
SELECT * FROM listings WHERE poster_id=3 ORDER by listing_status;

-- Select all active bids for an agent
SELECT * from bids WHERE agent_id="123456789" AND bid_status="Active";

-- Select all bids for an agent
SELECT * from bids WHERE agent_id="123456789";

