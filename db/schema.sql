DROP DATABASE IF EXISTS TRUSL;
CREATE DATABASE TRUSL;
use TRUSL;

CREATE TABLE agents (
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   license INTEGER NOT NULL,
   title VARCHAR(256) NOT NULL,
   phone VARCHAR(15) NOT NULL,
   web_site VARCHAR(2083),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(32) NOT NULL UNIQUE,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    salt VARCHAR(256) NOT NULL,
    password VARCHAR (256) NOT NULL,
    agent_id INTEGER,
    FOREIGN KEY (agent_id) REFERENCES agents(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listings (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    poster_id INTEGER,
    property_address VARCHAR(256),
    listing_status ENUM("Active", "Signed"),
    estimated_value INTEGER,
    type_of_home VARCHAR(256),
    FOREIGN KEY (poster_id) REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bids (
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   agent_id INTEGER NOT NULL,
   listing_id INTEGER NOT NULL,
   bid_status ENUM("Active", "Signed", "Rejected"),
   services VARCHAR(8),
   message VARCHAR(500),
   rejection_reason VARCHAR(500),
   FOREIGN KEY (agent_id) REFERENCES agents(id),
   FOREIGN KEY (listing_id) REFERENCES listings(id),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    agent_id INTEGER NOT NULL,
    poster_id INTEGER NOT NULL,
    review VARCHAR(500),
    stars INTEGER NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

