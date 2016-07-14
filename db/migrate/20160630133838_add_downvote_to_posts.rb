class AddDownvoteToPosts < ActiveRecord::Migration
  def change
  	add_column :posts, :downvote, :integer
  end
end
