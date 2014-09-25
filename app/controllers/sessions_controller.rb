class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(session_params)
    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      render json: 'invalid something something'
    end
  end
  
  def destroy
    sign_out!
    redirect_to root_url
  end
  
  private
  
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
