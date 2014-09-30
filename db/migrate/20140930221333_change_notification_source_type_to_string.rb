class ChangeNotificationSourceTypeToString < ActiveRecord::Migration
  def change
    change_column :notifications, :source_type, :string
  end
end
