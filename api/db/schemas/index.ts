import mongoose from 'mongoose';

const mythSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const getMythModel = (collectionName: string) => {
  return mongoose.model('Myth', mythSchema, collectionName);
};

export default getMythModel;
