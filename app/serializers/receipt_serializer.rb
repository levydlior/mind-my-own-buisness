class ReceiptSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :image
  belongs_to :buisness
end
