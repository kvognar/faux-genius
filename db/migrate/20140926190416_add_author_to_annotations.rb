class AddAuthorToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :author_id, :integer
    add_index :annotations, :author_id
  end
end
