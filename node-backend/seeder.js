
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
dotenv.config()
connectDB()

const importData = async () => {
  try {
    // trước khi seeder cái mới thì xóa hết cái cũ
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // add user data trong data/users.js vào bảng user
    const createdUsers = await User.insertMany(users)

    // Lấy admin ở vt[0]
    const adminUser = createdUsers[0]._id

    // duyệt product data trong data/products.js
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // add từng product vào table product
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    
    // xóa toàn bộ dữ liệu trong các bảng
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

// khi gõ console node node-backend/seeder là import data
// khi gõ console node node-backend/seeder -d là destroy data
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}