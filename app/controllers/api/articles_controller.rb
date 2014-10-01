class Api::ArticlesController < ApplicationController
  
  def index
    @articles = Article.includes(:artist, :album).all
    render :index
  end
  
  def show
    @article = Article.includes(
                                :artist,
                                :album,
                                suggestions: :author, 
                                annotations: [:author, {suggestions: :author}]
                                ).find(params[:id])
    render :show
  end
  
  def create
    Article.transaction do
      artist = Artist.find_by_name(artist_params[:name])
      artist ||= Artist.create(artist_params)
    
      if album_params[:title]
        @album = Album.find_by(title: album_params[:title], artist_id: artist.id)
        @album || Album.create(title: album_params[:title], artist: artist)
      end
    
      @article = Article.new(article_params)
      @article.artist = artist
      @article.submitter = current_user
      @article.album = @album if @album
    
      if @article.save
        @album.articles << @article if @album 
        render json: @article
      else
        render json: @article.errors.full_messages, status: :unprocessable_entity
      end
    end
  end
  
  def search
    @articles = Article.find_by_query(params[:query])
    render :search
  end
  
  private
  
  def album_params
    params.require(:album).permit(:title)
  end
    
  def article_params
    params.require(:article).permit(:title, :body)
  end
  
  def artist_params
    params.require(:artist).permit(:name)
  end
  
end