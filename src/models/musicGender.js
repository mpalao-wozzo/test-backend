import { Schema, model } from 'mongoose';

const musicGenderSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true, maxlength: 50 },
  active: { type: Boolean, default: true, require: true },
  deleted: { type: Boolean, default: false, required: true },
});

const musicGenderModel = model('musicGender', musicGenderSchema);
export default musicGenderModel;
