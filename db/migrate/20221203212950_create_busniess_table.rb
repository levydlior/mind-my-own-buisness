class CreateBusniessTable < ActiveRecord::Migration[7.0]
  def change
    create_table :busniess_tables do |t|
    t.string :name
    t.belongs_to :user, null: false, foreign_key: true
    t.timestamps
    end
  end
end
