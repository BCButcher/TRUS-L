use TRUSL;

INSERT INTO agents (license, first_name, last_name, email, phone, web_site, password) VALUES (123456789, "Abby", "Banksy", "abbybanksy@broker.ca", "416-123-4567", "https://www.abbybanksy.com", "password");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site, password) VALUES (234567890, "Charles", "Daly", "charlesdaly@broker.ca", "416-234-5678", "https://www.charlesdaly.com", "password");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site, password) VALUES (345678901, "Kanchani", "Franks", "kanchanifranks@broker.ca", "647-123-4567", "https://www.kanchanifranks.com", "password");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site, password) VALUES (456789012, "Hashim", "Siyam", "hashimsiyam@broker.ca", "647-456-7890", "https://www.hashimsiyam.com", "password");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site, password) VALUES (567890123, "Rupam", "Smith", "rupamsmith@broker.ca", "416-789-1234", "https://www.rupamsmith.com", "password");

INSERT INTO consumers (display_name, first_name, last_name, email, password) VALUES ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com", "password");
INSERT INTO consumers (display_name, first_name, last_name, email, password) VALUES ("Neo", "Thomas A.", "Anderson", "thomasaanderson@fake.com", "password");
INSERT INTO consumers (display_name, first_name, last_name, email, password) VALUES ("Super", "Louie", "Kritski", "louiekritski@fake.com", "password");

INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (1, "E02", "Active", 1000000, "b");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (2, "E01", "Active", 2000, "a");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (3, "E11", "Active", 3000, "d");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (3, "E11", "Active", 1800, "d");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (3, "E12", "Active", 2500, "d");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (3, "E06", "Active", 3600, "d");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (3, "E14", "Active", 3500, "d");

INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 1, "Active", "abc", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (2, 1, "Active", "f", "Hire me because I am your mother.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (3, 1, "Active", "df", "I will work tirelessly.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (4, 1, "Active", "abcdef", "Look at some of the last properties I sold.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (5, 1, "Active", "eg", "Blah blah blah");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 2, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (5, 2, "Active", "bdef", "Yadda yadda yadda");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (4, 3, "Active", "bdef", "You won't regret it.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 3, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 4, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (2, 4, "Active", "bf", "I know the inside of the market.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (3, 4, "Active", "bef", "You will have the best choices with me.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 5, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 6, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 7, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
