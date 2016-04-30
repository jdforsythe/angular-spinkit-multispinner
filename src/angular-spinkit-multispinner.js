(function() {
  function MultispinnerDirective($compile) {
    return {
      restrict: 'E',
      replace: true,

      scope: {
        whitelist: '<?',
        blacklist: '<?'
      },

      controller: 'MultispinnerController',

      link: function(scope, element) {
        var spinner = scope.spinner();

        element.html('<' + spinner.type + '-spinner></' + spinner.type + '-spinner>');
        $compile(element.contents())(scope);
      }
    };
  }
  MultispinnerDirective.$inject = ['$compile'];

  function MultispinnerController($scope, $rootScope, MultispinnerService) {
    $scope.spinner = MultispinnerService.getSpinner;

    // whitelist and blacklist override each other. whitelist takes precedence
    // so blacklist will be set first
    if ($scope.blacklist && $scope.blacklist.length) {
      MultispinnerService.setBlacklist($scope.blacklist);
    }

    if ($scope.whitelist && $scope.whitelist.length) {
      MultispinnerService.setWhitelist($scope.whitelist);
    }

    $rootScope.$on('$routeChangeStart', function() {
      MultispinnerService.startSpinner();
    });

    $rootScope.$on('$routeChangeSuccess', function() {
      MultispinnerService.stopSpinner();
    });

    $rootScope.$on('$routeChangeError', function() {
      MultispinnerService.stopSpinner();
    });
  }
  MultispinnerController.$inject = ['$scope', '$rootScope', 'MultispinnerService'];

  function MultispinnerService() {

    var availableSpinners = [
      'rotating-plane', 'double-bounce', 'wave', 'wandering-cubes', 'pulse',
      'chasing-dots', 'circle', 'three-bounce', 'cube-grid', 'word-press', 'fading-circle'
    ],
    usableSpinners = [],
    spinning = false,
    currentSpinner;

    var getRandomSpinner = function() {
      return usableSpinners[Math.floor(Math.random() * usableSpinners.length)];
    };

    return {
      startSpinner: function() {
        spinning = true;
        currentSpinner = getRandomSpinner();
      },

      stopSpinner: function() {
        spinning = false;
      },

      getSpinner: function() {
        if (!currentSpinner)
          currentSpinner = getRandomSpinner();
        return {
          spinning: spinning,
          type: currentSpinner
        };
      },

      setWhitelist: function(whitelist) {
        usableSpinners = [];

        if (whitelist.length)
          angular.copy(whitelist, usableSpinners);
      },

      setBlacklist: function(blacklist) {
        usableSpinners = [];

        if (blacklist.length) {
          angular.forEach(availableSpinners, function(spin) {
            if (blacklist.indexOf(spin) === -1)
              usableSpinners.push(spin);
          });
        }
      }
    };
  }

  angular.module('angular-spinkit-multispinner', [])
    .service('MultispinnerService', MultispinnerService)
    .controller('MultispinnerController', MultispinnerController)
		.directive('multiSpinner', MultispinnerDirective);
})();
