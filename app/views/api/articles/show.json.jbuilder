json.(@article, :title, :artist, :body)

json.annotations @article.annotations,
                 :article_id,
                 :start_index,
                 :end_index,
                 :slug,
                 :body
