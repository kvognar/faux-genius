class AddSlugToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :slug, :text, null: false
    add_index :annotations, :slug
  end
end
