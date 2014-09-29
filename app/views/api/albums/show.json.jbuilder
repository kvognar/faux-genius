json.extract! @album, :title, :id, :image_url

json.artist @album.artist, :name, :id
json.articles @album.articles, :title, :id