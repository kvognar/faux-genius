class UsersController < ApplicationController
  
  def create
    @user = User.create(user_params)
    if @user.save
      sign_in!(@user)
      redirect_to params[:referrer]
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def user_params
    params.require('user').permit(:username, :password)
  end
end
