puts "seeding.."

User.create(username: "test", password: "test", email: "test@test.com")
User.create(username: "test2", password: "test2", email: "test2@test.com")

Business.create(name: 'Bnb', user_id: 1)
Business.create(name: 'test buis', user_id: 1)
Business.create(name: 'third test', user_id: 1)
Business.create(name: 'dif user', user_id: 2)


puts " done seeding.."