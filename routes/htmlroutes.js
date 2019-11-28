let path = require('path');

const express = require('express');

const router = express.Router();

// View the home page
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index-consumer.html'));
});

router.get('/index-agent', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index-agent.html'));
});

// Login screen
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// User creates a profile
router.get('/profile/:type', function (req, res) {
  if (req.params.type === 'agent') {
    res.sendFile(path.join(__dirname, '..', 'public', 'profileA.html'));
  }
  else {
    res.sendFile(path.join(__dirname, '..', 'public', 'profileC.html'));
  }
});

// User creates a profile
router.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

router.get('/createbid', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'createbid.html'));
});

router.get('/counterbid', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'counter_bid.html'));
});

router.get('/deletebid', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'delete_bid.html'));
});

// View a particular bid.
router.get('/biddetails', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'biddetails.html'));
});

// View all bids for a listing.
router.get('/viewbids', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'viewbids.html'));
});

// View client contact information
router.get('/clientdetails', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'clientdetails.html'));
});

// View agent contact information
router.get('/agentdetails', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'agentdetails.html'));
});

// Static contact us information (Trusael)
router.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
});

// Static contact us information (Trusael)
router.get('/contactconfirm', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'contact-confirm.html'));
});

// Static blurb about Trusael
router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
});

module.exports = router;

