class ReceiptSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :image
  has_one :buisness
end
