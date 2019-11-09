// Dependencies
// =============================================================
let express = require('express');
let DBAccess = require('./lib/dbAccess');

// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});

// Close your database connection when Node exits
process.on('exit', async function (code) {
    return console.log(`About to exit with code ${code}`);
});
