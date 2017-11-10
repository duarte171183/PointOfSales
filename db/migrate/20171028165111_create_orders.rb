class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.decimal :totalorder
      t.references :user, index: true, foreign_key: true
      t.references :supplier, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
