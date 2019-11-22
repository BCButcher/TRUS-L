use TRUSL;

INSERT INTO agents (license, phone, web_site, title) VALUES (123456789, "416-123-4567", "https://www.abbybanksy.com", "Broker");
INSERT INTO agents (license, phone, web_site, title) VALUES (234567890, "416-234-5678", "https://www.charlesdaly.com", "Agent");
INSERT INTO agents (license, phone, web_site, title) VALUES (345678901, "647-123-4567", "https://www.kanchanifranks.com", "Broker of Record");
INSERT INTO agents (license, phone, web_site, title) VALUES (456789012, "647-456-7890", "https://www.hashimsiyam.com", "Agent");
INSERT INTO agents (license, phone, web_site, title) VALUES (567890123, "416-789-1234", "https://www.rupamsmith.com", "Agent");

INSERT INTO users (display_name, first_name, last_name, email, salt, password) VALUES ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com", "d512dc906ded86ba323632e26858ef85", "b0ba031e04b9fcf34270cdd6280a3bc80f6d6cfe6a0b3e1e14f574ab8d740298ca33589f6459eba2c38e29d943794c5262d58f238ba4c08e30235760b627cb21");
INSERT INTO users (display_name, first_name, last_name, email, salt, password) VALUES ("Neo", "Thomas A.", "Anderson", "thomasaanderson@fake.com", "4f3b6d2d5ea7ee97c9a3bf0aaa43e376", "5e25532a08c2bbc0a3ce990a286a6d8d310a82cd55927529529edad7d8ced3f23b9ab5071a9ea408cfdc570b81951b1c46a39a713f145f6ed1ffaea4345e585c");
INSERT INTO users (display_name, first_name, last_name, email, salt, password) VALUES ("Super", "Louie", "Kritski", "louiekritski@fake.com", "500d0eca576888ead472bc964acd2a06", "fb20520f016f14ff2faece71012c70524dbeae81b8d51f6e537b0fcba7ed227470a6d7ba6565d8026e6888b03a0627811851a3aa19e057367417aeb079dd3a94");
INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES ("Abby Banksy", "Abby", "Banksy", "abbybanksy@broker.ca", "9e3fc85d4d6b886fd51eff6fa3d7c262", "94d21a2ead10156df638fcc8411b360ff8bdf2fd3a7e00e8c40584787c0b662bd61aede0453d771dc2312a2deaa0acb0b90650abc1fe99ce0b46152f4055e2a6", 1);
INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES ("Charles Daly", "Charles", "Daly", "charlesdaly@broker.ca", "bacb76eeba4df0ada4ef4201c92472d8", "02df831d376adf066ac6ceb52ac6e2173478d1862f10819267cc187a1d89d927882f869c07b13ce8e282dd99c596f3830c5a8de2f4c05f6afc6e04d56a4bd33e", 2);
INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES ("Kanchani Franks", "Kanchani", "Franks", "kanchanifranks@broker.ca", "368c4d603f15760348a237579eee5c99", "cdc2eed8ac06ca60813d9fa873ef2543390e51f4961884c85d17a641760462fb72ae93c86dff0efb25c6c9a1808dafc1c4de975c50537c3e9aa374750db5496d", 3);
INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES ("Hashim Siyam", "Hashim", "Siyam", "hashimsiyam@broker.ca", "6f3374279aba6899c0017179bf6a8175", "d7c56875f3e1009a62babf20c3f5c7d3eeddd7d593fd5dd6235178d338a4d20c6b0ff59be632b3d36580fb1b604d2672f8307117a548130674c6aab21a4fbf73", 4);
INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES ("Fiona Smith", "Fiona", "Smith", "fionasmith@broker.ca", "c0aaab436e85d15dc64ce380973b8cd8", "797c3afbb2af6594af6ddf807a39bb119f0b35720ebe579f17fdf3d20e3a81a2f79361f81d05319f1c3e0d2c3b598586496a3b324bd44da5c29f9860d7389c6e", 5);

INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (1, "1 Main St", "Active", 1000000, "Detached");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (2, "1 Smith St", "Active", 800000, "Semi");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Yonge St", "Active", 750000, "Townhome");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Sheppard Ave", "Active", 650000, "Condo");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Bloor", "Active", 2500000, "Detached");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Old Forest Hill Road", "Signed", 3600000, "Semi");
INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (3, "1 Royal York", "Signed", 799000, "Townhome");

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
