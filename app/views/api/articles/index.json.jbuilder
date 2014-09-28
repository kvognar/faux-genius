json.array! @articles do |article|
  json.extract! article, :title, :id, :artist_name, :album_title, :image_url

end