import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin ',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isActive: true,
  },
  {
    name: 'ngoc',
    email: 'ngoc@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isActive: true,
  },
  {
    name: 'phong',
    email: 'phong@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isActive: true,
  },
]

export default users