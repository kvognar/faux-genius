class AddNotNullRequirementToAnnotationAuthor < ActiveRecord::Migration
  def change
    change_column :annotations, :author_id, :integer, null: false
  end
end
