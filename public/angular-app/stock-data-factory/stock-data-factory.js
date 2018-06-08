angular.module('cdfinance').factory('stockDataFactory', stockDataFactory);

function stockDataFactory($http) {
    return {
      stockList : stockList
    };
    
    function stockList() {
        return $http.get('/api/stocks').then(complete).catch(failed);
    }
    
    function complete(response) {
        return response.data;
    }
    
    function failed(error) {
        console.log(error.statusText);
    }
}