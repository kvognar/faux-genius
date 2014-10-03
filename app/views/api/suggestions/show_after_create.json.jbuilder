json.extract! @suggestion, :id, :body, :suggestable_id, :suggestable_type
json.author @suggestion.author, :id, :username, :image_url
