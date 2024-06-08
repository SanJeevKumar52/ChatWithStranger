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

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // Extract the user ID to chat with from the request parameters
        const senderId = req.user._id; // Get the sender's user ID from the authenticated user's data

        // Find the conversation involving both the sender and the recipient
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Populate the messages within the conversation

        // If no conversation is found, respond with an empty array
        if (!conversation) {
            return res.status(200).json([]);
        }

        // Respond with the messages of the found conversation
        res.status(200).json(conversation.messages);
    } catch (error) {
        // Log any errors and respond with a 500 status code and an error message
        console.error("Error in getMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

