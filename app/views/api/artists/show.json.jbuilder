json.extract! @artist, :name, :id, :description, :image_url

json.articles @artist.articles, :title, :id

json.albums @artist.albums, :title, :id