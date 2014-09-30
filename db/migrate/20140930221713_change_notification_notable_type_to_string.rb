class ChangeNotificationNotableTypeToString < ActiveRecord::Migration
  def change
    change_column :notifications, :notable_type, :string
  end
end
