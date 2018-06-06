angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  console.log("findController");
  vm.find = function() {
    var symbol = vm.symbol
    console.log(symbol)
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      var stockprice = response.data.price
      // New VeiwModels for Additional Information to Display
      var stockname = response.data.stock.name
      var stocksale = response.data.stock.lastSale
      var stocksector = response.data.stock.sector
      var stockindustry = response.data.stock.industry
      var stockyear = response.data.stock.ipoYear
      var stocksummary = response.data.stock.summary
    
      vm.stockprice = stockprice
      vm.stockname = stockname
      vm.stocksale = stocksale
      vm.stocksector = stocksector
      vm.stockindustry = stockindustry
      vm.stockyear = stockyear
      vm.stocksummary = stocksummary
      
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })
  }
  }