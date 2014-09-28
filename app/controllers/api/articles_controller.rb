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
    artist = Artist.find_by_name(artist_params[:name])
    artist ||= Artist.create(artist_params)
    
    @article = Article.new(article_params)
    @article.artist = artist
    
    if @article.save
      render json: @article
    else
      render json: @article.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def search
    @articles = Article.find_by_query(search_params[:query])
    render :search
  end
  
  private
  
  def search_params
    params.require(:search).permit(:query)
  end
  
  def article_params
    params.require(:article).permit(:title, :body)
  end
  
  def artist_params
    params.require(:artist).permit(:name)
  end
  
end