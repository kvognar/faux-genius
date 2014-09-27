json.extract! @article, :id, :title, :body

json.artist @article.artist, :name, :description, :image_url


json.album do 
  if @article.album.nil?
    json.null!
  else
    json.extract! @article.album, :title, :id
  end
end

json.suggestions @article.suggestions do |suggestion|
  json.extract! suggestion,
                 :id, 
                 :body, 
                 :suggestable_id, 
                 :suggestable_type,
                 :created_at
                 
  json.author suggestion.author, :username, :id
end

json.annotations @article.annotations do |annotation|
  json.extract! annotation,
                :article_id,
                :start_index,
                :end_index,
                :slug,
                :body,
                :id
  json.author annotation.author, :username, :id
                
  json.suggestions annotation.suggestions do |suggestion|
    json.extract! suggestion,
                   :id, 
                   :body, 
                   :suggestable_id, 
                   :suggestable_type,
                   :created_at
                   
    json.author suggestion.author, :username, :id
  end

end
