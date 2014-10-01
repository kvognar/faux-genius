class Api::ArtistsController < ApplicationController
  
  def show
    @artist = Artist.includes(:articles, :albums).find(params[:id])
    render :show
  end
  
  def update
    @artist = Artist.find(params[:id])
    if @artist.update_attributes(artist_params)
      render json: @artist
    else
      render json: @artist.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def artist_params
    params.require(:artist).permit(:description, :image_url)
  end
  
end