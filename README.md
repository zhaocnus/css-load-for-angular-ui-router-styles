# css-load-for-angular-ui-router-styles

An Angular Service to detect CSS load for [angular-ui-router-styles](https://github.com/manuelmazzuola/angular-ui-router-styles)

## Usage
- In controller. This is not a common usage because normally you don't want to put logic related to CSS styles in a controller.

```javascript
  angular.module('foo', ['uiRouterStyles', 'common.services.checkCssLoaded'])
    .config([
      '$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('foo', {
            ...,
            data: {
              ...,
              css: ['style-1.css', 'style-2.css'] // css can be an array or string
            }
          });
      }
    ])
    .controller('FooController', [
      '$scope',
      '$state',
      'checkCssLoaded',
      function ($scope, $state, checkCssLoaded) {
        $scope.css = $state.current.data.css;

        checkCssLoaded.check($scope.css).then(function () {
          // 'style-1.css' and 'style-2.css' are loaded
          // do stuff here
        });
      }
    ]);
```

- In a directive. This is a more common usage.

```javascript
  angular.module('foo')
    .directive('aiBeforeAfter', [
      'checkCssLoaded',
      function (checkCssLoaded) {
        return {
          ...,
          link: function (scope, element, attr) {
            // assume scope.css is already defined in controller
            checkCssLoaded.check(scope.css).then(function () {
              // 'style-1.css' and 'style-2.css' are loaded
              // do stuff here
            });
          }
        }
      }
    ]);

```
