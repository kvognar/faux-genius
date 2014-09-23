class Api::AnnotationsController < ActionController::Base

  def create
    @annotation = Annotation.new(annotation_params)
    if @annotation.save
      render json: @annotation
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