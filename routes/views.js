'use strict';

module.exports = (app) => {
  app.get('/*', function(req, res){
    res.sendfile(process.env.FORNT_END+process.env.HOME_PAGE);
  });
};
