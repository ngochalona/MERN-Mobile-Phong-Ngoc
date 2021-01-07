import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc        Auth with google
// @route       GET / auth/ google
// @access      Public
const provideGoogle = asyncHandler(async (req, res) => {
    // tim user theo google_id
    const userfindId = await User.findOne({google_id: req.body.google_id})
     
    if(userfindId){
        if(userfindId.isActive) {
            res.json({
                _id: userfindId._id,
                name: userfindId.name,
                email: userfindId.email,
                isAdmin: userfindId.isAdmin,
                isActive: userfindId.isActive,
                google_id: userfindId.google_id,
                token: generateToken(userfindId._id),
            })
        } else {
            res.status(401)
            throw new Error('IsActive is false')
        }
    }
    else {
        // khoi tao 1 user
        var newUser ={
            name: req.body.name,
            password: "123456",
            google_id: req.body.google_id,
            email: req.body.email
        }

        // tim user theo email
        const userFindEmail = await User.findOne({email: req.body.email})       
        if(userFindEmail) {
            userFindEmail.google_id = req.body.google_id
            const updateUser = await userFindEmail.save()
            if(updateUser.isActive) {
                res.json({
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin,
                    isActive: updateUser.isActive,
                    google_id: updateUser.google_id,
                    token: generateToken(updateUser._id),
                })
            } else {
                res.status(401)
                throw new Error('IsActive is false')
            }
        } else {
            const user = await User.create(newUser)
            if(user.isActive) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isActive: user.isActive,
                    google_id: user.google_id,
                    token: generateToken(user._id),
                })
            } else {
                res.status(401)
                throw new Error('IsActive is false')
            }
        }
    }
})

const provideFacebook = asyncHandler(async (req, res) => {
    // tim user theo google_id
    const userfindId = await User.findOne({facebook_id: req.body.facebook_id})
    
    if(userfindId){
        if(userfindId.isActive){
            res.json({
                _id: userfindId._id,
                name: userfindId.name,
                email: userfindId.email,
                isAdmin: userfindId.isAdmin,
                isActive: userfindId.isActive,
                facebook_id: userfindId.facebook_id,
                token: generateToken(userfindId._id),
            })
        } else {
            res.status(401)
            throw new Error('IsActive is false')
        }
        
    }
    else {
        // khoi tao 1 user
        var newUser ={
            name: req.body.name,
            password: "123456",
            facebook_id: req.body.facebook_id,
            email: req.body.email
        }

        // tim user theo email
        const userFindEmail = await User.findOne({email: req.body.email})       
        if(userFindEmail) {
            userFindEmail.facebook_id = req.body.facebook_id

            const updateUser = await userFindEmail.save()
            if(updateUser.isActive) {
                res.json({
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin,
                    isActive: updateUser.isActive,
                    facebook_id: updateUser.facebook_id,
                    token: generateToken(updateUser._id),
                })
            }
            else {
                res.status(401)
                throw new Error('IsActive is false')
            }
        } else {
            const user = await User.create(newUser)
            if(user.isActive) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isActive: user.isActive,
                    facebook_id: user.facebook_id,
                    token: generateToken(user._id),
                })
            }else {
                res.status(401)
                throw new Error('IsActive is false')
            }
        }
    }
})

export { 
    provideGoogle,
    provideFacebook
} 