use TRUSL;

INSERT INTO agents (license, first_name, last_name, email, phone, web_site) VALUES (123456789, "Abby", "Banksy", "abbybanksy@broker.ca", "416-123-4567", "https://www.abbybanksy.com");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site) VALUES (234567890, "Charles", "Daly", "charlesdaly@broker.ca", "416-234-5678", "https://www.charlesdaly.com");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site) VALUES (345678901, "Kanchani", "Franks", "kanchanifranks@broker.ca", "647-123-4567", "https://www.kanchanifranks.com");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site) VALUES (456789012, "Hashim", "Siyam", "hashimsiyam@broker.ca", "647-456-7890", "https://www.hashimsiyam.com");
INSERT INTO agents (license, first_name, last_name, email, phone, web_site) VALUES (567890123, "Rupam", "Smith", "rupamsmith@broker.ca", "416-789-1234", "https://www.rupamsmith.com");

INSERT INTO consumers (display_name, first_name, last_name, email) VALUES ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com");
INSERT INTO consumers (display_name, first_name, last_name, email) VALUES ("Neo", "Thomas A.", "Anderson", "thomasaanderson@fake.com");
INSERT INTO consumers (display_name, first_name, last_name, email) VALUES ("Super", "Louie", "Kritski", "louiekritski@fake.com");

INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (1, "E02", "Active", 1000000, "b");
INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (2, "E01", "Active", 2000, "a");
INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (3, "E11", "Active", 3000, "d");
INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (3, "E11", "Active", 1800, "d");
INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (3, "E12", "Active", 2500, "d");
INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (3, "E06", "Active", 3600, "d");
INSERT INTO listings (poster_id, area, listing_status, money, transaction_type) VALUES (3, "E14", "Active", 3500, "d");

INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 1, "Active", "abc", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (234567890, 1, "Active", "f", "Hire me because I am your mother.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (345678901, 1, "Active", "df", "I will work tirelessly.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (456789012, 1, "Active", "abcdef", "Look at some of the last properties I sold.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (567890123, 1, "Active", "eg", "Blah blah blah");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 2, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (567890123, 2, "Active", "bdef", "Yadda yadda yadda");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (456789012, 3, "Active", "bdef", "You won't regret it.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 3, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 4, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (234567890, 4, "Active", "bf", "I know the inside of the market.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (345678901, 4, "Active", "bef", "You will have the best choices with me.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 5, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 6, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (123456789, 7, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
