import Converstion from '../models/convertions.model.js';
import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Converstion.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Converstion.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.message.push(newMessage._id); // Corrected field name to 'message'
        }

        // Socket IO

        // Run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error is in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error in sendMessage controller" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Converstion.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("message"); // Change 'messages' to 'message'

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.message; // Change 'messages' to 'message'

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error in getMessages controller" });
    }
};
