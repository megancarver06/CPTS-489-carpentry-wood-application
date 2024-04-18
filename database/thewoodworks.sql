CREATE TABLE IF NOT EXISTS BUYER ( username TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL );

CREATE TABLE IF NOT EXISTS SELLER ( storename TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS ADMIN ( username TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL );

CREATE TABLE IF NOT EXISTS LISTING ( listingid TEXT PRIMARY KEY NOT NULL, image1 TEXT NOT NULL, image2 TEXT, image3 TEXT, image4 TEXT, listingtitle TEXT NOT NULL, listingprice TEXT NOT NULL, listingdesc TEXT NOT NULL, listingwidth TEXT NOT NULL, listingheight TEXT NOT NULL, listingdepth TEXT NOT NULL, listingseller TEXT NOT NULL );

CREATE TABLE IF NOT EXISTS ORDERS ( ordernum TEXT PRIMARY KEY NOT NULL, purchasedby TEXT NOT NULL, soldby TEXT NOT NULL, listingid TEXT NOT NULL );

DELETE FROM BUYER;

DELETE FROM SELLER;

DELETE FROM ADMIN;

DELETE FROM LISTING;

DELETE FROM ORDERS;

INSERT INTO ADMIN VALUES ('meganadmin', '1234', 'megan.carver@wsu.edu');

INSERT INTO BUYER VALUES ('meganbuyer', '1234', 'megan.carver@wsu.edu');

INSERT INTO SELLER VALUES ('TimberTreasures', 'meganseller', '1234', 'megan.carver@wsu.edu');

INSERT INTO LISTING VALUES ('0001', '/images/Wireframe Placeholder Images/dresser.jpeg', '/images/Wireframe Placeholder Images/dresser2.jpeg', '/images/Wireframe Placeholder Images/dresser3.jpeg', '/images/Wireframe Placeholder Images/dresser4.jpeg', 'Oak Dresser', '00.00', 'Buy now! Mid century modern oak dresser by Timber Treasures', '64', '32', '18', 'Timber Treasures');

INSERT INTO ORDERS VALUES ('00000001', 'meganbuyer', 'meganseller', '0001');