class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name, null: false
      t.text :description
      t.string :image_url

      t.timestamps
    end
  end
end
