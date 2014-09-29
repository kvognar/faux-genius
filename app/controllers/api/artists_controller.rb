class Api::ArtistsController < ApplicationController
  
  def show
    @artist = Artist.includes(:articles, :albums).find(params[:id])
    render :show
  end
  
end