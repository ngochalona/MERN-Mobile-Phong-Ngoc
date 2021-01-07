import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// định hình khung table user
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    google_id: {
      type: String,
    },
    facebook_id: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// trước khi lưu xuống csdl
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  // tạo salt
  const salt = await bcrypt.genSalt(10)
  // mã hóa password với salt
  this.password = await bcrypt.hash(this.password, salt)
})

// tạo model user
const User = mongoose.model('User', userSchema)
export default User