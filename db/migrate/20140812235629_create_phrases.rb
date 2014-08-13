class CreatePhrases < ActiveRecord::Migration
  def change
    create_table :phrases do |t|
      t.string :chinese
      t.string :pinyin
      t.string :definition
      t.belongs_to :list
    end
  end
end
