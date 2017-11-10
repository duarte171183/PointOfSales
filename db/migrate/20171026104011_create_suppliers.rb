class CreateSuppliers < ActiveRecord::Migration
  def change
    create_table :suppliers do |t|
      t.string :name
      t.string :rfc
      t.integer :phone_number
      t.string :email
      t.string :address
      t.integer :postal_code

      t.timestamps null: false
    end
  end
end
