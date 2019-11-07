let DBAccess = require("../lib/jsonAccess");

let agents = new DBAccess("./db/agents.json");
let consumers = new DBAccess("./db/consumers.json");
let bids = new DBAccess("./db/bids.json");

module.exports = function(app) {
	// Retrieve all agents
	app.get("/api/agent", function(req, res) {
	    try {
	        res.status(200);
	        res.json(agents.getRecords());
	    }
	    catch(err) {
	        // Internal error on the server side.
	        res.status(500);
	        res.json(err);
	    }
	    return res;
	});
	
	// Retrieve all consumers
	app.get("/api/consumer", function(req, res) {
	    try {
	        res.status(200);
	        res.json(consumers.getRecords());
	    }
	    catch(err) {
	        // Internal error on the server side.
	        res.status(500);
	        res.json(err);
	    }
	    return res;
	});
	
	// Retrieve all bids
	app.get("/api/bid", function(req, res) {
	    try {
	        res.status(200);
	        res.json(bids.getRecords());
	    }
	    catch(err) {
	        // Internal error on the server side.
	        res.status(500);
	        res.json(err);
	    }
	    return res;
	});
	
	// Delete an agent
	app.delete("/api/agent/:id", function(req, res) {
	 try {
	     const success = agents.deleteRecord(req.params.id);
	
	     if(success) {
	         res.status(204); // HTML 204 request succeeded
	     } else {
	         res.status(404); // HTML status 404 not found
	     }
	     res.json(agents.getRecords());
	 }
	 catch(err) {
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res;
	});
	
	// Delete a consumer
	app.delete("/api/consumer/:id", function(req, res) {
	 try {
	     const success = consumer.deleteRecord(req.params.id);
	
	     if(success) {
	         res.status(204); // HTML 204 request succeeded
	     } else {
	         res.status(404); // HTML status 404 not found
	     }
	     res.json(consumers.getRecords());
	 }
	 catch(err) {
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res;
	});
	
	// Delete a bid
	app.delete("/api/bid/:id", function(req, res) {
	 try {
	     const success = bids.deleteRecord(req.params.id);
	
	     if(success) {
	         res.status(204); // HTML 204 request succeeded
	     } else {
	         res.status(404); // HTML status 404 not found
	     }
	     res.json(bids.getRecords());
	 }
	 catch(err) {
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res;
	});
	
	// Update an agent
	app.put("/api/agent/:id", function(req, res) {
	 try {
	     const success = agents.updateRecord(req.params.id, req.body);
	
	     if(success) {
	         res.status(204); // HTML 204 request succeeded
	     } else {
	         res.status(404); // HTML status 404 not found
	     }
	     res.json(agents.getRecords());
	 }
	 catch(err) {
	     // Internal error on the server side.
		 console.log(err);
	     res.status(500);
	     res.json(err);
	 }
	 return res;
	});
	
	// Update a consumer
	app.put("/api/consumer/:id", function(req, res) {
	 try {
	     const success = consumers.updateRecord(req.params.id, req.body);
	
	     if(success) {
	         res.status(204); // HTML 204 request succeeded
	     } else {
	         res.status(404); // HTML status 404 not found
	     }
	     res.json(consumers.getRecords());
	 }
	 catch(err) {
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res;
	});
	
	// Update a bid
	app.put("/api/bid/:id", function(req, res) {
	 try {
	     const success = bids.updateRecord(req.params.id, req.body);
	
	     if(success) {
	         res.status(204); // HTML 204 request succeeded
	     } else {
	         res.status(404); // HTML status 404 not found
	     }
	     res.json(bids.getRecords());
	 }
	 catch(err) {
		 console.log(err);
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res;
	});
	
	
	
	// Create an agent
	app.post("/api/agent", function(req, res) {
	 try {
	     res.status(201); // HTML status 201 creation successful
	     res.json(agents.addRecord(req.body));
	 }
	 catch(err) {
	     // Internal error on the server side.
		 console.log(err);
	     res.status(500);
	     res.json(err);
	 }
	 return res; 
	});
	
	// Create a consumer
	app.post("/api/consumer", function(req, res) {
	 try {
	     res.status(201); // HTML status 201 creation successful
	     res.json(consumers.addRecord(req.body));
	 }
	 catch(err) {
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res; 
	});
	
	// Create a bid
	app.post("/api/bid", function(req, res) {
	 try {
	     res.status(201); // HTML status 201 creation successful
	     res.json(bids.addRecord(req.body));
	 }
	 catch(err) {
	     // Internal error on the server side.
	     res.status(500);
	     res.json(err);
	 }
	 return res; 
	});
}	
	
	
