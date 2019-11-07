let path = require("path");

module.exports = function(app) {
	// View the home page
	app.get("/", function(req, res) {
	    res.sendFile(path.join(__dirname, "/public/index.html"));
	});
}


