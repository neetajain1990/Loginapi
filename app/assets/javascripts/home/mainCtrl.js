angular.module('flapperNews')
.controller('MainCtrl', [
'$scope',
'posts',
'$state',
function($scope, posts,$state){
  $scope.posts = posts.posts;
  // $scope.posts = posts.query();
  $scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  posts.create({
    title: $scope.title,
    link: $scope.link,
  });
  $scope.title = '';
  $scope.link = '';
};

//  $scope.incrementUpvotes = function(post) {
//   posts.upvote(post);
// };

   $scope.deletePost = function(post) {
    posts.destroy(post);
    $scope.posts.splice(post, 1);
  };

  // $scope.decreaseDownvotes = function(post)
  // {
  //   posts.downvote(post);
  // };

  $scope.incrementUpvotes = function(post) {
    if ( post.upvote == 10 ) {
      return;
    } else {
      posts.upvote(post);
    }
  };
  
  $scope.decreaseDownvotes = function(post) {
    if ( post.downvote == 0 ) {
      return;
    } else {
      posts.downvote(post);
    }
  };
  
}]);



