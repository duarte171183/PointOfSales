class RenameSales < ActiveRecord::Migration
  def change
  	rename_table :sales, :line_items
  end
end
