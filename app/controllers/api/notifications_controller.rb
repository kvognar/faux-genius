class Api::NotificationsController < ApplicationController
  
  def index
    @notifications = current_user.incoming_notifications
                                 .includes(source: [:author, :article])
   render :index
  end
end
