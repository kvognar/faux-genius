json.extract! @article, :id, :title, :body, :image_url

json.artist @article.artist, :name, :description, :image_url, :id


json.album do 
  if @article.album.nil?
    json.null!
  else
    json.extract! @article.album, :title, :id, :image_url
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

json.followings @article.followings, :id, :follower_id, :followed_id, :followed_type