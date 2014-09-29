class AddSubmitterToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :submitter_id, :integer
  end
end
