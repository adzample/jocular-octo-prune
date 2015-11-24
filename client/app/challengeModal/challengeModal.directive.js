'use strict';

angular.module('jocularOctoPruneApp')
  .directive('challengeModal', function () {
    return {
      templateUrl: 'app/challengeModal/challengeModal.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        show: '='
      },
      link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width){
        scope.dialogStyle.width = attrs.width;
      }
      if (attrs.height){
        scope.dialogStyle.height = attrs.height;
      }
      scope.hideModal = function() {
        scope.show = false;
      };
    }
  };
});
