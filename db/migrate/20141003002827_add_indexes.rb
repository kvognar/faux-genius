class AddIndexes < ActiveRecord::Migration
  def change
    add_index :articles, :submitter_id
  end
end
