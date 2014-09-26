class Api::ArticlesController < ApplicationController
  
  def index
    @articles = Article.all
    render json: @articles
  end
  
  def show
    @article = Article.includes(:suggestions, 
                                annotations: :suggestions).find(params[:id])
    # render json: @article
    render :show
  end
  
  def create
    @article = Article.new(article_params)
    if @article.save
      render json: @article
    else
      render json: @article.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  private
  
  def article_params
    params.require(:article).permit(:title, :artist, :body)
  end
  
end