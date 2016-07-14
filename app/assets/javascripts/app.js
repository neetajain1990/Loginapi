var myApp = angular.module('flapperNews', ['templates','ui.router','ui.bootstrap', 'Devise']); 
myApp.config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
  ]);

angular.module('flapperNews').config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode(true);
}]);


angular.module('flapperNews', ['ui.router', 'templates', 'Devise'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'assets/auth/_login.html',
       controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
           $state.go('home');

        }, function(error) {
            alert(error.data.error)
        });
      }]
    })
    
    .state('register', {
      url: '/register',
      templateUrl: 'assets/auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        },function(error) {
          alert(error.data.error)
        });
      }]
    })
    // .state('home',{
    //   url: '/home',
    //   templateUrl: 'assets/home/_home.html',
    //   controller: 'AuthCtrl'})

    .state('home',{
      url: '/home',
      templateUrl: 'assets/home/_home.html',
       controller: 'MainCtrl',
      resolve: {
             postPromise: ['posts', function(posts){
                      return posts.getAll();
               }]}
    })
    
    .state('logout',{
      url: '/logout',
      templateUrl: 'assets/auth/logout.html',
      controller: 'AuthCtrl'
    })
    .state('about',{
      url: '/about',
      templateUrl: 'assets/auth/about.html',
      controller: 'AuthCtrl'
    })

    .state('posts', {
                    url: '/posts/{id}',
                     templateUrl: 'assets/posts/_posts.html',
                     controller: 'PostsCtrl',
                     resolve: {
                     post: ['$stateParams', 'posts', function($stateParams, posts) {
                     return posts.get($stateParams.id);
                    }]
                  }
                });




    $urlRouterProvider.otherwise('about');
  }])

myApp.run(function() {
  return console.log('angular app running');
});


// angular.module('flapperNews', ['ui.router'])
//     //Provider
//     .config([
//         '$stateProvider',
//         '$urlRouterProvider',
//         function($stateProvider, $urlRouterProvider) {

//             $stateProvider
//                 .state('home', {
//                     url: '/home',
//                     templateUrl: 'assets/home/_home.html',
//                     controller: 'MainCtrl',
//                     resolve: {
//                         postPromise: ['posts', function(posts){
//                             return posts.getAll();
//                         }]
//                     }
//                 })
//                 .state('posts', {
//                     url: '/posts/{id}',
//                     templateUrl: 'assets/posts/_posts.html',
//                     controller: 'PostsCtrl',
//                     resolve: {
//                         postPromise: ['posts', function(posts){
//                             return posts.getAll();
//                         }]
//                     }
//                 })

//             $urlRouterProvider.otherwise('home');
//         }])
