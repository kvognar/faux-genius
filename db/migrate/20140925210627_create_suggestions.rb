class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.integer :author_id, null: false
      t.text :body, null: false
      t.references :suggestable, polymorphic: true, null: false

      t.timestamps
    end
    add_index :suggestions, :author_id
    add_index :suggestions, :suggestable_id
    add_index :suggestions, :suggestable_type
  end
end
