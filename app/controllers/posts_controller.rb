class PostsController < ApplicationController
	respond_to :json
  before_filter :authenticate_user!, only: [:create, :upvote]

	def index
   @post = Post.all
   respond_with @post
  end

  def create
    @post = Post.create(post_params.merge(user_id: current_user.id))
    respond_with @post
  end

  def show
    @post = Post.find(params[:id])
    respond_with @post
  end
  
  def upvote
    post = Post.find(params[:id])
    post.increment!(:upvotes)
    respond_with post
  end

  def downvote
    post = Post.find(params[:id])
    post.decrement!(:upvotes)
    respond_with post
  end

 def destroy
  post = Post.find(params[:id])
  post.destroy
  respond_with post
  end


  private
  def post_params
    params.require(:post).permit(:link, :title)
  end
end
