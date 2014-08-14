class AddPrivacyToLists < ActiveRecord::Migration
  def change
    add_column :lists, :public?, :boolean, default: 1
  end
end
