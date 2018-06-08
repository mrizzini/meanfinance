angular.module('cdfinance').controller("BuyController", BuyController);

function BuyController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  
  vm.buy = function() {
    if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
      var token = $window.sessionStorage.token;
      var decodedToken = jwtHelper.decodeToken(token);
      var username = decodedToken.username;
      
      var data = {"symbol" : vm.symbol, "amount": vm.amount}
      
      // Validation so that user is unable to buy a negative amount of Stocks
      if (vm.amount < 0) {
        alert("Please enter a Positive amount.")        
        }
      else {
      
      $http.post('/api/users/'+ username +"/stocks", data).then(function(response) {
        //check the responses
        // Prompt user if Purchase is successful
        
        vm.message = 'Successful Purchase!';
        console.log(data);
        
      }).catch(function(error) {
        console.log(error);
        
      })
      }
    } else {
      $location.path('/');
      
    }
  }
}