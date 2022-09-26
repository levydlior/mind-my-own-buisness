class BusinessSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :receipts

end
