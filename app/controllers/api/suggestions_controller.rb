class Api::SuggestionsController < ApplicationController
  
  def create
    @suggestion = current_user.authored_suggestions.new(suggestion_params)
    if @suggestion.save
      render json: @suggestion
    else
      render json: @suggestion.errors, status: :unprocessable_entity
    end
  end
  
  def show
    @suggestion = Suggestion.includes(:author, :suggestable)
                            .find(params[:id])
    render :show
  end
  
  def destroy
  end
  
  private
  
  def suggestion_params
    params.require(:suggestion)
          .permit(:body, :suggestable_id, :suggestable_type)
  end
  
end