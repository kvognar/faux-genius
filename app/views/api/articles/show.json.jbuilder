json.(@article, :id, :title, :artist, :body)

json.suggestions @article.suggestions, 
                 :id, 
                 :author_id, 
                 :body, 
                 :suggestable_id, 
                 :suggestable_type,
                 :created_at

json.annotations @article.annotations do |annotation|
  json.extract! annotation,
                :article_id,
                :start_index,
                :end_index,
                :slug,
                :body,
                :id
                
  json.suggestions annotation.suggestions,
                   :id, 
                   :author_id, 
                   :body, 
                   :suggestable_id, 
                   :suggestable_type

end
