(function() {
  'use strict';

  var LIMIT = 10;

  function isCssLoaded(url) {
    for (var i = 0; i < document.styleSheets.length; i += 1) {
      var href = document.styleSheets[i].href || '';

      if (href.indexOf(url) > -1) {
        return true;
      }
    }

    return false;
  }

  // If isCssLoaded does not work on all browsers, below
  // is a hack to check if a css is loaded by detecting a css property
  /*
  function isCssLoaded(url) {
    var position = window.getComputedStyle(document.body).getPropertyValue('position');
    console.log(position);
    return position === 'relative';
  }
  */

  function checkLoaded(url, deferred, count) {
    if (isCssLoaded(url)) {
      deferred.resolve();
      return;
    }

    count += 1;
    if (count >= LIMIT) {
      deferred.reject('Cannot load css ' + url);
    } else {
      setTimeout(function() {
        checkLoaded(url, deferred, count);
      }, 33);
    }
  }

  function checkCssLoaded($q) {
    return {
      check: function (urls) {
        var promises = [];

        angular.forEach(urls, function (url) {
          var deferred = $q.defer();

          checkLoaded(url, deferred, 0);
          promises.push(deferred.promise);
        });

        return $q.all(promises);
      }
    };
  }

  angular.module('common.services.checkCssLoaded', [])
    .factory('checkCssLoaded', [
      '$q',
      checkCssLoaded
    ]);
})();
