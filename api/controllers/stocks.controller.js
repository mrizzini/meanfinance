var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');
var https = require('https');
var stockPrice = require('./shared/stockPrice.js');

module.exports.stocksGetPrice = function(req, res) {
  var symbol = req.params.symbol;
  console.log("looking up symbol:", symbol);
  
  Stock
    .findById(symbol)
    .exec(function(err, stock) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else if (!stock) {
        res
          .status(404)
          .json({ "message" : "Stock symbol invalid"});
      } else {
        //found the stock symbol it is a valid NASDAQ stock symbol pull data
        //from api.
        var price = stockPrice.getPrice(req, res, symbol, stock);

      }
    });
  
};

module.exports.stocksGetAll = function(req, res) {
  console.log("GET the Stocks!");
  console.log(req.query);
  
  var offset = 0;
  var count = 6578;
  var maxCount = 6578;
  
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
      return;
  }
  
  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
      return;
  }
  
  Stock
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, stocks) {
      console.log(err);
      console.log(stocks);
      if (err) {
        console.log("Error finding the stocks");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found stocks", stocks.length);
        res
          .json(stocks);
      }
    });
};
