class CreateUserPhrases < ActiveRecord::Migration
  def change
    create_table :user_phrases do |t|
      t.belongs_to :user
      t.belongs_to :phrase
      t.string :notes
    end
  end
end
