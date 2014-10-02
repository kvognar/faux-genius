class RemoveNotableFromNotifications < ActiveRecord::Migration
  def change
    remove_column :notifications, :notable_id
    remove_column :notifications, :notable_type
  end
end
