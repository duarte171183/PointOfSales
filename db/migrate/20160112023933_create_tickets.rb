class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.decimal :subtotal, precision: 10, scale: 2
      t.decimal :total, precision: 10, scale: 2
      t.decimal :pay_with, precision: 10, scale: 2
      t.decimal :change, precision: 10, scale: 2
      t.integer :status

      t.timestamps null: false
    end
  end
end
