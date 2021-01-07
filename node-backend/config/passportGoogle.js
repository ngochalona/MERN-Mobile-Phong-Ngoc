import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import ProviderGoogle from '../models/userModel.js'

const provider = function() {
    passport.use (new GoogleStrategy.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
    },
    async function(accessToken, refreshToken, profile, done)  {
        // tạo 1 providerGoogle mới
        const newProvider = {
            google_id: profile.id,
            name: profile.displayName,
            password: '123456',
            email: profile.emails,
        }
        try {
            // tìm kiếm providerGoogle bằng Id
            let providerGoogle = await ProviderGoogle.findOne({ google_id: profile.id})
            
            if(providerGoogle){
                // trả về providerGoogle
                done(null, providerGoogle);
            } else {
                // tạo providerGoogle mới
                providerGoogle = await ProviderGoogle.create(newProvider);
                done(null, providerGoogle);
            }
        } catch (err) {
            console.error(err);
        }
    }))  
    
    //hàm được gọi khi xác thực thành công để lưu thông tin providerGoogle vào session
    passport.serializeUser( function(providerGoogle, done) {
        done(null, providerGoogle.id);
    })

    //hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu providerGoogle dựa vào thông tin lưu trên session và gắn vào req.user
    passport.deserializeUser( function(id, done) {
        ProviderGoogle.findById(id, function(err, providerGoogle) {
            done(err, providerGoogle);
        });
    })

}

export default provider