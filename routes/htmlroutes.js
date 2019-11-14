let path = require('path');

module.exports = function (app) {
  // View the home page
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/index.html'));
  });

  // Login screen
  app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/login/login.html'));
  });

  // User creates a profile
  app.get('/profile/:type', function (req, res) {
    if (req.params.type === 'agent') {
      res.sendFile(path.join(__dirname, '../public/assets/profile/profileA.html'));
    }
    else {
      res.sendFile(path.join(__dirname, '../public/assets/profile/profileC.html'));
    }
  });

  // User creates a profile
  app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/login/dashboard.html'));
  });

  app.get('/createbid', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/bids/createbid.html'));
  });

  // // After the user has rejected a bid, this page asks if they want to tell the
  // // agent why.
  // app.get('/process_bid', function (req, res) {
  //   res.sendFile(path.join(__dirname, '../public/assets/bids/process_bid.html'));
  // });

  // View a particular bid.
  app.get('/biddetails', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/assets/bids/biddetails.html'));
  });

  // // Tell the user that their listing has been posted
  // app.get('/confirm', function (req, res) {
  //   res.sendFile(path.join(__dirname, '../public/assets/bids/confirm.html'));
  // });

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
