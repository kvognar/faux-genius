class RemoveDefaultArtistFromArticles < ActiveRecord::Migration
  def change
    change_column_default :articles, :artist_id, nil 
  end
end
