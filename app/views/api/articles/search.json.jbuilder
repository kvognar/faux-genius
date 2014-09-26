json.array! @articles do |article|
  json.extract! article, :title, :id
  json.artist article.artist, :name, :id, :image_url
  json.album article.album, :title, :id, :image_url
end