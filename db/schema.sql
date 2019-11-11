DROP DATABASE IF EXISTS TRUSL;
CREATE DATABASE TRUSL;
use TRUSL;

CREATE TABLE agents (
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   license INTEGER NOT NULL,
   first_name VARCHAR(32) NOT NULL,
   last_name VARCHAR(32) NOT NULL,
   email VARCHAR(32) NOT NULL,
   phone VARCHAR(15) NOT NULL,
   web_site VARCHAR(2083),
   password VARCHAR (256) NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consumers (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(32) NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    password VARCHAR (256) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listings (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    poster_id INTEGER,
    property_address VARCHAR(256),
    listing_status ENUM("Active", "Signed", "Closed"),
    estimated_value INTEGER,
    transaction_type VARCHAR(4),
    FOREIGN KEY (poster_id) REFERENCES consumers(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bids (
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   agent_id INTEGER,
   listing_id INTEGER,
   bid_status ENUM("Active", "Signed", "Closed"),
   services VARCHAR(8),
   message VARCHAR(500),    
   FOREIGN KEY (agent_id) REFERENCES agents(id),
   FOREIGN KEY (listing_id) REFERENCES listings(id),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ENUM("Rent", "Buy", "Sell", "Rent out"),
-- ENUM("In-person tours", "Online advertising", "Paint", "Print brochures", "Print advertising", "Staging", "Virtual tours", "Buy your house if you can't sell it"),

