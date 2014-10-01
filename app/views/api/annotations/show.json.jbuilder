json.extract! @annotation,
              :article_id,
              :start_index,
              :end_index,
              :slug,
              :body,
              :id
json.author @annotation.author, :username, :id
json.article @annotation.article, :title, :artist_name