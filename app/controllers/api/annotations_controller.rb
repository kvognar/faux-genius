class Api::AnnotationsController < ApplicationController

  def create
    @annotation = current_user.authored_annotations.new(annotation_params)
    if @annotation.save
      render :show
    else
      render json: @annotation.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    @annotation = Annotation.find(params[:id])
    if @annotation.update(annotation_update_params)
      render json: @annotation
    else
      render json: @annotation.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @annotation = Annotation.find(params[:id])
    @annotation.destroy
    render json: @annotation
  end
  
  private
  
  def annotation_update_params
    params.require('annotation').permit(:body)
  end
  
  def annotation_params
    params.require('annotation').permit(:article_id, 
                                        :start_index, 
                                        :end_index,
                                        :body,
                                        :slug)
  end
end