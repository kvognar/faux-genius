class Api::AlbumsController < ApplicationController
  
  def show
    @album = Album.includes(:artist, :articles).find(params[:id])
    render :show
  end
  
  def update
    @album = Album.find(params[:id])
    if @album.update_attributes(album_params)
      render json: @album
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def album_params
    params.require(:album).permit(:image_url)
  end
  
end