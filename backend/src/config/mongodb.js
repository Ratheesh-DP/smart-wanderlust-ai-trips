import mongoose from 'mongoose';

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_wanderlust');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

const userInteractionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  destination: { type: String, index: true },
  actionType: { type: String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

userInteractionSchema.index({ userId: 1, createdAt: -1 });

export const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);
