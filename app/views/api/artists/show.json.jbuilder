json.extract! @artist, :name, :id, :description, :image_url

json.articles @artist.articles, :title, :id

json.albums @artist.albums, :title, :id

json.followed !!current_user && current_user.followed_artists.include?(@artist)

json.followings @artist.followings, :id, :follower_id, :followed_id, :followed_type