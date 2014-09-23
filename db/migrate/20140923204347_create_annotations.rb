class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :article_id, null: false
      t.integer :start_index, null: false
      t.integer :end_index, null: false
      t.text :body, null: false

      t.timestamps
    end
    add_index :annotations, :article_id
  end
end
