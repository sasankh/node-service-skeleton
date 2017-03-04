'use strict';

var Q = require('q');

var logger = require(__base + '/server/utilities/modules/logger');

module.exports.checkIfJsonRequest = function(req) {

  var deferred = Q.defer();

  var fid = {
    requestId: req.requestId,
    handler: req.passData.handler,
    functionName: 'checkIfJsonRequest'
  };

  logger.debug(fid,'invoked');

  if(req.is('application/json') === false) {
    deferred.reject({ error: { code: 103, message: 'Incoming request (Content-Type) is not application/json.', fid: fid, type: 'warn', trace: null }});
  } else {

    try {
      var msg = JSON.parse(JSON.stringify(req.body));
      deferred.resolve(req);
    } catch(e) {
      deferred.reject({ error: { code: 103, message: 'Content (content-body) is not JSON type.', fid: fid, type: 'warn', trace: null }});
    }

  }

  return deferred.promise;

};

module.exports.checkIfMultipartFormDataRequest = function(req) {

  var deferred = Q.defer();

  var fid = {
    requestId: req.requestId,
    handler: req.passData.handler,
    functionName: 'checkIfMultipartFormDataRequest'
  };

  logger.debug(fid,'invoked');

  var body = req.body;

  if(req.is('multipart/form-data') === false) {
    deferred.reject({ error: { code: 103, message: 'Incoming request (Content-Type) is not multipart/form-data.', fid: fid, type: 'debug', trace: null }});
  } else {
    if(req.body){
      try {
        var msg = JSON.parse(JSON.stringify(req.body));
        deferred.resolve(req);
      } catch(e) {
        deferred.reject({ error: { code: 103, message: 'Content-Type is multipart/form-data but the supplied content (content-body) is not JSON type.', fid: fid, type: 'debug', trace: null }});
      }
    } else {
      deferred.resolve(req);
    }
  }

  return deferred.promise;
};
