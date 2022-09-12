class Business < ApplicationRecord
  belongs_to :user
  has_many :receipts, dependent: :destroy

  validates :name, uniqueness: { scope: :user_id,
    message: "is already assigned to one of your buisnesses" }




  end
  