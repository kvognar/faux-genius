json.array! @articles do |article|
  json.extract! article, :title, :id
  json.artist article.artist, :name, :id, :image_url
  json.album do  
    if article.album
      json.extract! article.album, :title, :id, :image_url
    else
      json.null!
    end
  end
end