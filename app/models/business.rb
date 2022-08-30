class Business < ApplicationRecord
  belongs_to :user
  has_many :receipts

  validates :name, uniqueness: { scope: :user_id,
    message: "is already assigned to one of your buisnesses" }




  end
  