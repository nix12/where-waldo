class AddMapIdToScores < ActiveRecord::Migration[5.1]
  def change
    add_column :scores, :map_id, :integer
  end
end
