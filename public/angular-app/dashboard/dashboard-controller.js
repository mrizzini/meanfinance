angular.module('cdfinance').controller("DashboardController", DashboardController);

function DashboardController( $http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;
    
    $http.get('/api/users/'+ username +"/stocks").then(function(response) {
      vm.stocks = response.data
      
    }).catch(function(error) {
      console.log(error);
    })
    $http.get('/api/users/' + username).then(function(response) {
      vm.balance = response.data.balance
      vm.mystocks = response.data.mystocks 
      // Added my stocks that are purchased to dashboard

    })
  } else {
    $location.path('/');
  }
}