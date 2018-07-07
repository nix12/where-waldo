class CreateAddCoordinatesToMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :add_coordinates_to_maps do |t|
      t.integer :x_coordinate
      t.integer :y_coordinate

      t.timestamps
    end
  end
end
