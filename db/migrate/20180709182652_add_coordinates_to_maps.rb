class AddCoordinatesToMaps < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :x_coordinate, :integer
    add_column :maps, :y_coordinate, :integer
  end
end
