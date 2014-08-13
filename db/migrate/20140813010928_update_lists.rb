class UpdateLists < ActiveRecord::Migration
  def change
    add_column :lists, :icon, :string
  end
end
