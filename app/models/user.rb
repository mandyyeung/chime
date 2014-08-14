class User < ActiveRecord::Base
  include Gravtastic
  gravtastic
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_lists
  has_many :lists, through: :user_lists
  #has_many :phrases, through: :lists
  has_many :user_phrases
  has_many :phrases, through: :user_phrases

end
