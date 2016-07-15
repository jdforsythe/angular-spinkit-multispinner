describe('multispinner', function() {
  var elm, scope, rootScope;

  beforeEach(module('angular-spinkit-multispinner'));

  describe('whitelist', function() {

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();

      // allow only rotating-plane spinner
      scope.whitelist = [ 'rotating-plane' ];

      // allow only fading-circle spinner
      //scope.blacklist = [
      //  'rotating-plane', 'double-bounce', 'wave', 'wandering-cubes', 'pulse',
      //  'chasing-dots', 'circle', 'three-bounce', 'cube-grid', 'word-press'
      //];

      elm = $compile('<multi-spinner whitelist="whitelist"></multi-spinner>')(scope);
      scope.$apply();
      return elm;
    }));

    it('should start a spinner on $routeChangeStart', inject(function($rootScope) {
      $rootScope.$broadcast('$routeChangeStart');
      console.log(elm[0]);
      expect(elm[0].innerHTML).toMatch(/rotating-plane-spinner/);
      expect(elm[0].innerHTML).not.toMatch(/wave-spinner/);
    }));

    it('should stop on $routeChangeSuccess', inject(function($rootScope) {
      $rootScope.$broadcast('$routeChangeStart');
      expect(elm[0].innerHTML).toMatch(/rotating-plane-spinner/);
      $rootScope.$broadcast('$routeChangeSuccess');
      console.log(elm[0]);
      expect(elm[0].innerHTML).not.toMatch(/rotating-plane-spinner/);
    }));

  });

});
