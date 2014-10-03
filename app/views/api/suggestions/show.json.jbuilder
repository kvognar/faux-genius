json.extract! @suggestion, :id, :body, :suggestable_id, :suggestable_type
json.author @suggestion.author, :id, :username, :image_url
json.suggestable do
  
  if @suggestion.suggestable.class == Annotation
    json.slug @suggestion.suggestable.slug
    json.article do
      json.title @suggestion.suggestable.article.title
      json.artist_name @suggestion.suggestable.article.artist_name
      json.id @suggestion.suggestable.article.id
    end
  elsif @suggestion.suggestable.class == Article
    json.title @suggestion.suggestable.title
    json.artist_name @suggestion.suggestable.artist_name
    json.id @suggestion.suggestable.id
  end
end