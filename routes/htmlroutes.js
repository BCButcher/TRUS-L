let path = require('path');

module.exports = function (app) {
  // View the home page
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/index.html'));
  });

  // Why do I need to return the CSS file explicitly? Why doesn't the relative path work?
  app.get('/public/assets/css/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/css/style.css'));
  });

  // Login screen
  app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/login/login.html'));
  });

  // User creates a profile
  app.get('/profile/:type', function (req, res) {
    if (req.params.type === 'agent') {
      res.sendFile(path.join(__dirname, '../public/assets/profile/profilea.html'));
    }
    else {
      res.sendFile(path.join(__dirname, '../public/assets/profile/profilec.html'));
    }
  });

  // List the active bids
  app.get('/bids', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/bids/bids.html'));
  });

  // After the user has rejected a bid, this page asks if they want to tell the
  // agent why.
  app.get('/process_bid', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/bids/process_bid.html'));
  });

  // View a particular bid.
  app.get('/viewbid', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/bids/agent_bid.html'));
  });

  // Tell the user that their listing has been posted
  app.get('/confirm', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/bids/confirm.html'));
  });

  // View all active listings
  app.get('/listings', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/listings/listings.html'));
  });

  // Static contact us information (Trusael)
  app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/nav/contact.html'));
  });

  // Static blurb about Trusael
  app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/nav/about.html'));
  });
};
