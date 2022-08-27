class BusinessSerializer < ActiveModel::Serializer
  attributes :id, :name, :receipts
  has_one :user
  has_many :receipts
end
