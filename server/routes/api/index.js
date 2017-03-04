'use strict';

//module with all the api routes
var apiRoutes = require(__base + '/server/routes/api/routes');

//controllers
var health = require(__base + '/server/controllers/health');
var home = require(__base + '/server/controllers/home');

exports = module.exports = function(app) {

  //GET
  app.get(apiRoutes.home,home.getHome);
  app.get(apiRoutes.healthCheck,health.checkServerStatus);

  //POST


  //PUT


  //DEL


};
