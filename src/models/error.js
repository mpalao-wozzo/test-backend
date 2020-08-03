/**
 * The error model
 */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const errorSchema = new Schema(
  {
    info: { type: Object, required: true },
  },
  {
    timestamps: true,
  },
);

const errorModel = mongoose.model('Error', errorSchema);
export default errorModel;
