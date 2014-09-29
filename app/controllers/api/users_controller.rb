class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:submitted_articles,
                          authored_annotations: :article,
                          authored_suggestions: :suggestable).find(params[:id])
    render :show
  end
end