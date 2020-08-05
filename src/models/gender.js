import { Schema, model } from 'mongoose';

const genderSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  active: { type: Boolean, default: true, require: true },
  deleted: { type: Boolean, default: false, required: true },
});

const genderModel = model('gender', genderSchema);
export default genderModel;
