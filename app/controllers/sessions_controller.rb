class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(session_params)
    if @user
      sign_in!(@user)
      redirect_to :back
    else
      flash[:errors] = ["I don't remember you :("]
      redirect_to :back
    end
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
