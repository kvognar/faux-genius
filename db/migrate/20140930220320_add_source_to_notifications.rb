class AddSourceToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :source_id, :integer, null: false
    add_column :notifications, :source_type, :integer, null: false
    add_index :notifications, :source_id
    add_index :notifications, :source_type
  end
end
