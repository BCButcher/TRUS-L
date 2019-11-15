// Dependencies
// =============================================================
let express = require('express');
let path = require('path');
const apiRoutes_common = require(path.join(__dirname, 'routes', 'apiroutes_common'));
const apiRoutes_bid = require(path.join(__dirname, 'routes', 'apiroutes_bid'));
const apiRoutes_listing = require(path.join(__dirname, 'routes', 'apiroutes_listing'));
const apiRoutes_agent = require(path.join(__dirname, 'routes', 'apiroutes_agent'));
const apiRoutes_consumer = require(path.join(__dirname, 'routes', 'apiroutes_consumer'));
const htmlRoutes = require(path.join(__dirname, 'routes', 'htmlroutes'));

// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
//require(path.join(__dirname, 'routes', 'apiRoutes_common'))(app);

//app.use(bodyParser.urlencoded({extended: false}));

app.use(apiRoutes_common);
app.use(apiRoutes_bid);
app.use(apiRoutes_listing);
app.use(apiRoutes_agent);
app.use(apiRoutes_consumer);
app.use(htmlRoutes);

// require(path.join(__dirname, './routes/apiRoutes_bid'))(app);
// require(path.join(__dirname, './routes/apiRoutes_listing'))(app);
// require(path.join(__dirname, './routes/apiRoutes_agent'))(app);
// require(path.join(__dirname, './routes/apiRoutes_consumer'))(app);
// require(path.join(__dirname, './routes/htmlRoutes'))(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});

// Close your database connection when Node exits
process.on('exit', async function (code) {
  return console.log(`About to exit with code ${code}`);
});
