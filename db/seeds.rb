puts "seeding.."

User.create(username: "test", password: "test", email: "test@test.com")

Business.create(name: 'Bnb', user_id: 1)
Business.create(name: 'test buis', user_id: 1)

Receipt.create(name: "chair", image: "test", business_id:1)
Receipt.create(name: "table", image: "test", business_id:1)
Receipt.create(name: "test", image: "test", business_id:2)


puts " done seeding.."