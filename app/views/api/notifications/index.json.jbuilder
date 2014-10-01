json.array! @notifications do |notification|
  json.extract! notification, :created_at, :id
  # json.notable do
  #   json.id notification.notable.id
  #   json.title notification.title
  # end
  json.source do
    json.id notification.source.id
    json.type notification.source_type
    json.author do
      json.extract! notification.source.author, :id, :username, :image_url
    end
  end
  json.article notification.source.article, :id, :title
end