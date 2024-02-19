import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie =(userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt", token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, // prevent XSS  attacks cross-site scripting attack
        sameSite:"stric" ,// CSRF attacks cross-site request forgery attacks
        sameSite: "None",
        secure:process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;