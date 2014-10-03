class Api::NotificationsController < ApplicationController
  
  def index
    @notifications = current_user.incoming_notifications
                                 .includes(source: [:author, :parent])
   render :index
  end
end
