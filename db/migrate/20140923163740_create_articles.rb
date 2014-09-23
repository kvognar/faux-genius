class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.text :body, null: false
      t.timestamps
    end
    add_index :articles, :title
    add_index :articles, :artist
  end
end
