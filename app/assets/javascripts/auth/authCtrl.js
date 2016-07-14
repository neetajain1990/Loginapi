angular.module('flapperNews')
.controller('AuthCtrl', [
  '$scope',
  '$state',
  'Auth',
  function($scope, $state, Auth){
    $scope.login = function() {
      Auth.login($scope.user).then(function(){
       console.log($scope.user.avatar)
        $state.go('home');
      },function(error) {
        alert(error.data.error)
      })
    };

    $scope.register = function() {
      Auth.register($scope.user).then(function(){
        $state.go('home');
      },function(error) {
       alert(error.data.errors.email)
      })
    };

    $scope.logout = function(){
      Auth.logout($scope.user).then(function(oldUser){
        $state.go('login');  
      })
    };
    
    $scope.getCurrentUser = function(){
        Auth.currentUser().then(function(user) {
        console.log(user); 
        $scope.id = user.id;
        }); 
    };

  $scope.doUpload = function() {
    upload({
      url: '/upload',
      method: 'POST',
      data: {
        anint: 123,
        aBlob: Blob([1,2,3]), // Only works in newer browsers
        aFile: $scope.avatar, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
      }
    }).then(
      function (response) {
        console.log(response.data); // will output whatever you choose to return from the server on a successful upload
      },
      function (response) {
          console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
      }
    );
  }

  }]);

