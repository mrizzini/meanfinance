angular.module('cdfinance', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
  
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html',
      access: {
        restricted : false
      }
    })
    .when('/stocks', {
      templateUrl: 'angular-app/stock-list/stocks.html',
      controller: StocksController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/dashboard', {
      templateUrl: 'angular-app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/buy', {
      templateUrl: 'angular-app/buy/buy.html',
      controller: BuyController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/find', {
      templateUrl: 'angular-app/find/find.html',
      controller: FindController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    }) 
    .when('/deposit', {
      templateUrl: 'angular-app/deposit/deposit.html',
      controller: DepositController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}