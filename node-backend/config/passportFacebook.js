import FacebookStrategy from 'passport-facebook'
import passport from "passport";
import ProviderFaceBook from "../models/userModel.js";

const provider = function() {
    passport.use (new FacebookStrategy.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CLIENT_CALLBACK
    },
    async function(accessToken, refreshToken, profile, done) {
        // tạo 1 providerfacebook mới
        const newProvider = {
            facebook_id: profile.id,
            name: profile.displayName,
        }
        try {
            // tìm kiếm providerfacebook bằng Id
            let providerFacebook = await ProviderFaceBook.findOne({ facebook_id: profile.id})

            if(providerFacebook){
                // trả về providerfacebook
                done(null, providerFacebook);
            } else {
                // tạo providerfacebook mới
                providerFacebook = await ProviderFaceBook.create(newProvider);
                done(null, providerFacebook);
            }
        } catch (err) {
            console.error(err);
        }
    }))  

    //hàm được gọi khi xác thực thành công để lưu thông tin providerfacebook vào session
    passport.serializeUser( function(providerFacebook, done) {
        done(null, providerFacebook.id);
    })

    //hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu providerfacebook dựa vào thông tin lưu trên session và gắn vào req.user
    passport.deserializeUser( function(id, done) {
        ProviderFaceBook.findById(id, function(err, providerFacebook) {
            done(err, providerFacebook);
        });
    })

}

export default provider
