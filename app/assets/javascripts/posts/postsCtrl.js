angular.module('flapperNews')
.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;
  $scope.posts = posts.posts;
  $scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post.id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.post.comments.push(comment);
  });
  $scope.body = '';
  };
  $scope.incrementUpvotes = function(comment){
  posts.upvoteComment(post, comment);
};

 $scope.deleteComments =function(comment){
 posts.destroyComment(post, comment);
 $scope.posts.splice(post, comment,1);
 };

  }]);