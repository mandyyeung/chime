class AddImageToPhrases < ActiveRecord::Migration
  def change
    add_column :phrases, :image, :string
  end
end
