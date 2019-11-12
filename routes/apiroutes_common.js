let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
  app.post('/api/:id/:password', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.verifyPassword(req.params.id, req.params.password));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });
};
