class Receipt < ApplicationRecord
  belongs_to :business

  validates :name, uniqueness: { scope: :business_id,
    message: "is already assigned to one of the receipts of this business" }
   validates :amount, presence: true
   validates :image, presence: true
end
