class AddDateToReceipt < ActiveRecord::Migration[7.0]
  def change
    add_column :receipts, :date_field, :date
  end
end
