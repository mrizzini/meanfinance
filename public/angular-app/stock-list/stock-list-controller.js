angular.module('cdfinance').controller('StocksController', StocksController);

function StocksController(stockDataFactory) {
    var vm = this;
    vm.title = "All Stocks";
    stockDataFactory.stockList().then(function(response) {
        console.log(response);
        vm.stocks = response;
    });
}