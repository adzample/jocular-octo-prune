'use strict';

describe('Directive: challengeModal', function () {

  // load the directive's module and view
  beforeEach(module('jocularOctoPruneApp'));
  beforeEach(module('app/challengeModal/challengeModal.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<challenge-modal></challenge-modal>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the challengeModal directive');
  }));
});