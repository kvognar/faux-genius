class Api::AlbumsController < ApplicationController
  
  def show
    @album = Album.includes(:artist, :articles).find(params[:id])
    render :show
  end
  
end