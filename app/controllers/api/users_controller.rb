class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:submitted_articles,
                          authored_annotations: :article,
                          authored_suggestions: :suggestable).find(params[:id])
    render :show
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def user_params
    params.require('user').permit(:image_url)
  end
end