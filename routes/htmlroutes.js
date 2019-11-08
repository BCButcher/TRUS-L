let path = require("path");

module.exports = function (app) {
	// View the home page
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "/public/index.html"));
	});

	// Login screen
	app.get("/login", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/login.html"));
	});
	
	// User creates a profile
	app.get("/profile/:type", function(req, res) {
		if(req.params.type == "agent") {
			res.sendFile(path.join(__dirname, "/public/profilea.html"));
		}
		else {
			res.sendFile(path.join(__dirname, "/public/profilec.html"));
		}
	});

	// User has posted a listing
	app.get("/confirm", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/confirm.html"));
	});

	// List the active bids
	app.get("/bids", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/bids.html"));
	});

	// After the user has rejected a bid, this page asks if they want to tell the
	// agent why.
	app.get("/process_bid", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/process_bid.html"));
	});

	// View a particular bid. 
	app.get("/viewbid", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/agent_bid.html"));
	});

	// Tell the user that their listing has been posted
	app.get("/confirm", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/confirm.html"));
	});

	// View all active listings
	app.get("/listings", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/listings.html"));
	});

	// Static contact us information (Trusael)
	app.get("/contact", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/contact.html"));
	});

	// Static blurb about Trusael
	app.get("/about", function(req, res) {
		res.sendFile(path.join(__dirname, "/public/about.html"));
	});


}


 