class RemoveUseridFromsales < ActiveRecord::Migration
  def change
  	 remove_column :sales, :user_id
  end
end
