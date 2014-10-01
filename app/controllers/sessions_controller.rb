class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(session_params)
    if @user
      sign_in!(@user)
    else
      flash[:errors] = ["I don't remember you :("]
    end
    redirect_to params[:referrer]
  end
  
  def destroy
    sign_out!
    redirect_to :back
  end
  
  private
  
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
