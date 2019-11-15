use TRUSL;

INSERT INTO agents (license, phone, web_site, title) VALUES (123456789, "416-123-4567", "https://www.abbybanksy.com", "Broker");
INSERT INTO agents (license, phone, web_site, title) VALUES (234567890, "416-234-5678", "https://www.charlesdaly.com", "Agent");
INSERT INTO agents (license, phone, web_site, title) VALUES (345678901, "647-123-4567", "https://www.kanchanifranks.com", "Broker of Record");
INSERT INTO agents (license, phone, web_site, title) VALUES (456789012, "647-456-7890", "https://www.hashimsiyam.com", "Agent");
INSERT INTO agents (license, phone, web_site, title) VALUES (567890123, "416-789-1234", "https://www.rupamsmith.com", "Agent");

INSERT INTO users (display_name, first_name, last_name, email, password) VALUES ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com", "password");
INSERT INTO users (display_name, first_name, last_name, email, password) VALUES ("Neo", "Thomas A.", "Anderson", "thomasaanderson@fake.com", "password");
INSERT INTO users (display_name, first_name, last_name, email, password) VALUES ("Super", "Louie", "Kritski", "louiekritski@fake.com", "password");
INSERT INTO users (display_name, first_name, last_name, email, password, agent_id) VALUES ("Abby Banksy", "Abby", "Banksy", "abbybanksy@broker.ca", "password", 1);
INSERT INTO users (display_name, first_name, last_name, email, password, agent_id) VALUES ("Charles Daly", "Charles", "Daly", "charlesdaly@broker.ca", "password", 2);
INSERT INTO users (display_name, first_name, last_name, email, password, agent_id) VALUES ("Kanchani Franks", "Kanchani", "Franks", "kanchanifranks@broker.ca", "password", 3);
INSERT INTO users (display_name, first_name, last_name, email, password, agent_id) VALUES ("Hashim Siyam", "Hashim", "Siyam", "hashimsiyam@broker.ca", "password", 4);
INSERT INTO users (display_name, first_name, last_name, email, password, agent_id) VALUES ("Fiona Smith", "Fiona", "Smith", "fionasmith@broker.ca", "password", 5);

INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (1, "1 Main St", "Active", 1000000, "Detached");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (2, "1 Smith St", "Active", 2000, "Semi");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Yonge St", "Active", 3000, "Townhome");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Sheppard Ave", "Active", 1800, "Condo");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Bloor", "Signed", 2500, "Detached");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 College", "Signed", 3600, "Semi");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Royal York", "Signed", 3500, "Townhome");

INSERT INTO bids (agent_id, listing_id, bid_status, services, message, rejection_reason) VALUES (1, 1, "Rejected", "abc", "Hire me because I am in the top 1% of all realtors in the area.", "I am rejecting your bid because I am hiring my mother.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (2, 1, "Active", "f", "I will work tirelessly.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (3, 1, "Active", "df", "Hire me because I am your mother.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (4, 1, "Active", "abcdef", "Look at some of the last properties I sold.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (5, 1, "Active", "eg", "Blah blah blah");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 2, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (5, 2, "Active", "bdef", "Yadda yadda yadda");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (4, 3, "Active", "bdef", "You won't regret it.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 3, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 4, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (2, 4, "Active", "bf", "I know the market inside and out.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (3, 4, "Active", "bef", "I provide the best customer service of all realtors in the city.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 5, "Active", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 6, "Signed", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (1, 7, "Signed", "bdef", "Hire me because I am in the top 1% of all realtors in the area.");
