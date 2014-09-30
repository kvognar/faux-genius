class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.integer :user_id, null: false, index: true
      t.integer :notable_id, null: false, index: true
      t.integer :notable_type, null: false, index: true
      t.timestamps
    end
    add_index :notifications, :user_id
    add_index :notifications, :notable_id
    add_index :notifications, :notable_type
  end
end
