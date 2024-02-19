import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confrimPassword, gender } = req.body;
        if (password !== confrimPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        // hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt)
        // avatar
        const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?${userName}`;
        const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        });
       
    } catch (error) {
        console.log(error.message, "error in sign up controllers");
        res.status(500).json({ error: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        
        // Check if the user exists and if the password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);
        
        // Respond with user data
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log(error.message, "error in login controller");
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout=(req,res)=>{
   try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Loged out successfully"})
   } catch (error) {
    console.log(error.message, "error in sign out controller");
    res.status(500).json({ error: "Internal server error" });

   }
}

