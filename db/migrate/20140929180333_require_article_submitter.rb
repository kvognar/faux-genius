class RequireArticleSubmitter < ActiveRecord::Migration
  def change
    change_column :articles, :submitter_id, :integer, null: false
  end
end
