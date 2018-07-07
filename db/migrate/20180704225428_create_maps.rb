class CreateMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :maps do |t|
      t.boolean :target_clicked, default: false
      t.string :image_name

      t.timestamps
    end
  end
end
