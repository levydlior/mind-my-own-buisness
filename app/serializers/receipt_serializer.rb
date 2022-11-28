class ReceiptSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :image, :date_field
  belongs_to :business
end
