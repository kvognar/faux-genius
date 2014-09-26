class RemoveArtistFromArticles < ActiveRecord::Migration
  def change
    remove_column :articles, :artist
  end
end
