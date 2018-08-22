/**
 * @name modules/api.controller
 * @description It used to api module routes
 */
'use strict';

//custom modules
const mongoDb = require('../../helper/db/mongo'),
  genericSchema = require('../../helper/db/mongo/schema/generic.schema');

// Review Data model instance
let ReviewDataModel = mongoDb.model('ReviewDataModel', genericSchema, 'review-data');

/**
 * @name getAllAirportStats
 * @description It is used to get all airport stats.
 * @return All airport stats
 */
exports.getAllAirportStats = function(args, callback) {
  let offset = parseInt(args.offset) || 0;
  let limit = parseInt(args.limit) || 10;
  ReviewDataModel.aggregate([{
    $group: {
      _id: "$airport_name",
      reviewCount: {
        $sum: 1
      }
    }
  }, {
    $project: {
      _id: 0,
      airport: "$_id",
      reviewCount: "$reviewCount"
    }
  }, {
    $sort: {
      reviewCount: -1,
      airport: 1
    }
  }, {
    $skip: offset
  }, {
    $limit: limit
  }]).exec(function(err, data) {
    let response = {
      offset: offset,
      limit: limit
    };
    if (err) {
      response.code = 400;
      response.status = "error";
    } else {
      response.code = 200;
      response.status = "success";
      response.data = data;
    }
    callback(response);
  })
};

/**
 * @name getAirportStats
 * @description It is used to get airport stats.
 * @return Airport stats
 */
exports.getAirportStats = function(args, callback) {
  ReviewDataModel.aggregate([{
    $match: {
      airport_name: args.airport
    }
  }, {
    $group: {
      _id: "$airport_name",
      reviewCount: {
        $sum: 1
      },
      average: {
        $avg: "$overall_rating"
      },
      recommendationCount: {
        $sum: "$recommended"
      }
    }
  }, {
    $project: {
      _id: 0,
      airport: "$_id",
      reviewCount: "$reviewCount",
      average: "$average",
      recommendationCount: "$recommendationCount"
    }
  }, {
    $sort: {
      reviewCount: -1,
      airport: 1
    }
  }]).exec(function(err, data) {
    let response = {
    };
    if (err) {
      response.code = 400;
      response.status = "error";
    } else {
      response.code = 200;
      response.status = "success";
      response.data = data;
    }
    callback(response);
  });
};

/**
 * @name getAirportReviews
 * @description It is used to get airport reviews.
 * @return Airport reviews
 */
exports.getAirportReviews = function(args, callback) {
  let offset = parseInt(args.offset) || 0;
  let limit = parseInt(args.limit) || 10;
  ReviewDataModel.find({
    airport_name: args.airport
  }, {
    _id: 0,
    overall_rating: 1,
    date: 1,
    author_country: 1,
    content: 1
  }).sort({
    date: -1
  }).skip(offset)
    .limit(limit)
    .exec(function(err, data) {
      let response = {
        offset: offset,
        limit: limit
      };
      if (err) {
        response.code = 400;
        response.status = "error";
      } else {
        response.code = 200;
        response.status = "success";
        response.data = data;
      }
      callback(response);
    });

};