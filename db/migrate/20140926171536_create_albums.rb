class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.text :description
      t.integer :artist_id, null: false
      t.string :image_url

      t.timestamps
    end
    add_index :albums, :title
    add_index :albums, :artist_id
  end
end
