class Api::RelationshipsController < ApplicationController
  
  def create
    @relationship = Relationship.new(relationship_params)
    @relationship.follower = current_user
    if @relationship.save
      render json: @relationship
    else
      render json: @relationship.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @relationship = Relationship.find(params[:id])
    @relationship.destroy
    render json: @relationship
  end
  
  private
  
  def relationship_params
    params.require('relationship').permit(:followed_id, :followed_type)
  end
  
end
