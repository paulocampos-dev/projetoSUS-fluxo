import { Schema, model, connect } from 'mongoose';

const mongoURI = process.env.MONGO_URI || "mongodb://root:example@mongo:27017/"

// Denfinindo o schema da conversation
const chatHistorySchema = new Schema({
  userId: { type: String, required: true },
  messages: [{
    sender: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
});

// Criando um modelo baseado no schema
const ChatHistory = model('ChatHistory', chatHistorySchema);

/**
 * Conectando no MongoDB e retornando a instancia aberta
 * @returns {Promise<mongoose.Connection>}.
 */
async function connectToConversationDatabase() {
  try {
    const connection = await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB with Mongoose');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB with Mongoose:', error);
    throw error;
  }
}

/**
 * Exemplo de como usar:
 * 
 * // Import the database connection and ChatHistory model
 * const { connectToConversationDatabase, ChatHistory } = require('./conversations_db.js');
 * 
 * async function main() {
 *     // Conectar ao banco de dados
 *     await connectToConversationDatabase();
 * 
 *     // Pegar a história de conversa com um usuário
 *     const userId = 'user123';
 *     const userChatHistory = await ChatHistory.find({ userId });
 *     console.log('User Chat History:', userChatHistory);
 * 
 *     // Isso é possível mas não é recomendado. O gateway já faz isso.
 *     // Basta retornar a mensagem. O gateway cuida do armazenamento.
 *     // Inserir uma nova conversa
 *     const newChat = new ChatHistory({
 *         userId: 'user123',
 *         messages: [{ sender: 'BotKit', text: 'Hello!', timestamp: new Date() }],
 *     });
 *     await newChat.save();
 *     console.log('New Chat Saved:', newChat);
 * }
 * 
 * main().catch(console.error);
 */

export default {
  connectToConversationDatabase,
  ChatHistory,
};
