import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Validate input
        if (!message || !receiverId) {
            return res.status(400).json({ error: "Message and receiverId are required" });
        }

        // Find or create conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        // Create and save the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();

        // Add the message to the conversation and save
        conversation.messages.push(newMessage._id);

        //await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        // Respond with the new message ID
        res.status(201).json({ messageId: newMessage._id });

    } catch (error) {
        console.error("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
