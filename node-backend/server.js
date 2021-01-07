import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import passport from 'passport'
import session from 'express-session'
import passportGoogle from './config/passportGoogle.js'
import passportFacebook from './config/passportFacebook.js'
import provideRoutes from './routes/provideRoutes.js'

import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

passportGoogle()
passportFacebook()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

// sesion
app.use(session({
    secret: "kanze",
    resave: false,
    saveUninitialized: false
}))

// configure my app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Controll-Allow-Headers', 'X-Requested-With, content-tpye, Authorization');
    next();
});


// passport middleware
// middleware được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
app.use(passport.initialize());
// middleware sử dụng kịch bản Passport , sử dụng session lấy thông tin user rồi gắn vào req.user.
app.use(passport.session());

// login with socialite
app.use('/auth', provideRoutes);

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// catch error khi không tìm thấy url 
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})


// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p._id === req.params.id)
//     res.json(product)
// })

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))