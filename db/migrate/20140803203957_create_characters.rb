class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.integer :rank
      t.string :traditional
      t.string :simplified
      t.string :pinyin
      t.string :jyutping
      t.string :definitions
      t.integer :strokes
      t.string :radical
    end
  end
end
