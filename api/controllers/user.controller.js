import User from '../models/user.model.js'

export const getUsersForSidebar = async (req, res)=>{

    try {
        const loggedInUserId = req.user._id
        // all users except the logged in one
        const allFilteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(allFilteredUsers)
    } catch (error) {
        console.log("Error in get user Side bar controller:", error.message);
        res.status(500).json({ error: "Internal server error in get users controller" });
    }
}