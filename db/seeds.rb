puts "seeding.."

User.create(username: "test", password: "test", email: "test@test.com")
User.create(username: "test2", password: "test2", email: "test2@test.com")

Business.create(name: 'Bnb', user_id: 1)
Business.create(name: 'test buis', user_id: 1)
Business.create(name: 'third test', user_id: 1)
Business.create(name: 'dif user', user_id: 2)

Receipt.create(name: "chair", amount: 10, image: "https://image.shutterstock.com/image-vector/realistic-paper-shop-receipt-barcode-600w-768909406.jpg", business_id:1)
Receipt.create(name: "table", amount: 10, image: "https://image.shutterstock.com/image-vector/realistic-paper-shop-receipt-barcode-600w-768909406.jpg", business_id:1)
Receipt.create(name: "test",  amount: 10, image: "https://image.shutterstock.com/image-vector/realistic-paper-shop-receipt-barcode-600w-768909406.jpg", business_id:2)


puts " done seeding.."