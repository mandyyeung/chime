class AddRatingToPhrases < ActiveRecord::Migration
  def change
    add_column :phrases, :rating, :integer
  end
end
