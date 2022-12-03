class CreateReceipts < ActiveRecord::Migration[7.0]
  def change
    create_table :receipts do |t|
      t.string :name
      t.integer :amount
      t.string :image
      t.belongs_to :business, null: false, foreign_key: true
      t.timestamps
    end
  end
end
