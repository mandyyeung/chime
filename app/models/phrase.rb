require 'carrierwave/orm/activerecord'

class Phrase < ActiveRecord::Base
  belongs_to :list
  has_many :user_phrases
  has_many :lists, through: :user_phrases

  searchable do
    text :chinese, :definition
  end

  mount_uploader :image, ImageUploader
end
