class User < ApplicationRecord
    has_secure_password

    has_many :businesses, dependent: :destroy
    has_many :receipts, through: :businesses
    
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :email, uniqueness: true
end
