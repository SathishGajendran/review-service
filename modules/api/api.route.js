/**
 * @name modules/api.route
 * @description It used to handle api module routes
 */
'use strict';

// custom modules
var apiRoutes = require('express').Router(),
  apiController = require('./api.controller');

/**
 * @name getAllAirportStats
 * @description It is used to get all airport stats.
 * @return all airport stats
 */
apiRoutes.get('/all/stats', function(req, res) {
  apiController.getAllAirportStats(req.query, function(data) {
    res.send(data);
  });
});

/**
 * @name getAirportStats
 * @description It is used to get airport stats.
 * @return Airport stats
 */
apiRoutes.get('/:airport/stats', function(req, res) {
  apiController.getAirportStats(req.params, function(data) {
    res.send(data);
  });
});

/**
 * @name getAirportReviews
 * @description It is used to get airport reviews.
 * @return Airport reviews
 */
apiRoutes.get('/:airport/reviews', function(req, res) {
  req.query.airport = req.params.airport;
  apiController.getAirportReviews(req.query, function(data) {
    res.send(data);
  });
});

module.exports = apiRoutes;

