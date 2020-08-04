import { Schema, model } from 'mongoose';

const artistSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  description: { type: String, trim: true, maxlength: 300 },
  active: { type: Boolean, default: true, require: true },
  deleted: { type: Boolean, default: false, required: true },
});

const artistModel = model('artist', artistSchema);
export default artistModel;
