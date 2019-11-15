let path = require('path');

module.exports = function (app) {
  // View the home page
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // Login screen
  app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  // User creates a profile
  app.get('/profile/:type', function (req, res) {
    if (req.params.type === 'agent') {
      res.sendFile(path.join(__dirname, '../public/profileA.html'));
    }
    else {
      res.sendFile(path.join(__dirname, '../public/profileC.html'));
    }
  });

  // User creates a profile
  app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
  });

  app.get('/createbid', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/createbid.html'));
  });

  app.get('/counterbid', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/counter_bid.html'));
  });

  app.get('/deletebid', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/delete_bid.html'));
  });

  // View a particular bid.
  app.get('/biddetails', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/biddetails.html'));
  });

  // View client contact information
  app.get('/clientdetails', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/clientdetails.html'));
  });

  // Static contact us information (Trusael)
  app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
  });

  // Static blurb about Trusael
  app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
  });
};
