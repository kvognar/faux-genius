class Api::AnnotationsController < ApplicationController

  def create
    @annotation = current_user.authored_annotations.new(annotation_params)
    if @annotation.save
      render :show
    else
      render json: @annotation.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  
  private
  
  def annotation_params
    params.require('annotation').permit(:article_id, 
                                        :start_index, 
                                        :end_index,
                                        :body,
                                        :slug)
  end
end