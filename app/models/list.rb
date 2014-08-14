class List < ActiveRecord::Base
  has_many :phrases
  has_many :user_lists
  has_many :users, through: :user_lists

  accepts_nested_attributes_for :phrases

end
