import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true, maxlength: 50 },
  active: { type: Boolean, default: true, require: true },
  deleted: { type: Boolean, default: false, required: true },
});

const genreModel = model('musicGender', genreSchema);
export default genreModel;
