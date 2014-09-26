class AddArtistAndAlbumToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :artist_id, :integer, null: false, default: 0
    add_column :articles, :album_id, :integer
    add_index :articles, :artist_id
    add_index :articles, :album_id
  end
end
