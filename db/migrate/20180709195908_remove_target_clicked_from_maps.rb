class RemoveTargetClickedFromMaps < ActiveRecord::Migration[5.1]
  def change
    remove_column :maps, :target_clicked, :boolean
  end
end
