json.array! @notifications do |notification|
  json.extract! notification, :created_at, :id
  json.source do
    json.id notification.source.id
    json.type notification.source_type
    json.author do
      json.extract! notification.source.author, :id, :username, :image_url
    end
  end
  if notification.source_type == "Annotation"
    json.article do 
      json.id notification.source.article_id 
      json.title notification.source.article_title
    end
  elsif notification.source_type == "Suggestion"
    json.suggestable notification.source.suggestable_data
  end
end