class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :username, :password, :email, :presence => true       
 has_many :posts
 has_many :comments
 mount_uploader :avatar, AvatarUploader
 #validates_presence_of   :avatar
end
