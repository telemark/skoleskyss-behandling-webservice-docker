'use strict'

var config = require('../config')
var mongojs = require('mongojs')
var db = mongojs('mongodb://' + config.DB_HOST + '/' + config.DB_NAME)
var applications = db.collection(config.DB_COLLECTION)

function getPublicResponse (request, reply) {
  var message = {
    message: '(Nothing but) Flowers',
    docs: 'See /docs'
  }
  reply(message)
}

function getApplications (request, reply) {
  var query = {}
  if (request.params.from && request.params.to) {
    query = {
      timestamp: {
        $gte: parseInt(request.params.from),
        $lte: parseInt(request.params.to)
      }
    }
  }
  console.log(query)
  applications.find(query, { '_id': 0 }, function (error, data) {
    reply(error || data)
  })
}

function addApplications (request, reply) {
  var data = request.payload.data
  applications.insert(data, function (error, data) {
    reply(error || data)
  })
}

module.exports.getPublicResponse = getPublicResponse

module.exports.getApplications = getApplications

module.exports.addApplications = addApplications
