class AddTotalsaleToSales < ActiveRecord::Migration
  def change
    add_column :sales, :totalsale, :decimal
  end
end
