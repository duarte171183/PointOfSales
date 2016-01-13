class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.references :product, index: true, foreign_key: true
      t.references :ticket, index: true, foreign_key: true
      t.decimal :quantity

      t.timestamps null: false
    end
  end
end
