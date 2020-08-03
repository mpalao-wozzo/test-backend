import { Schema, model } from 'mongoose';

/**
 * The refreshToken model
 */
const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    refreshToken: { type: String, required: true, maxlength: 100000 },
  },
  {
    timestamps: true,
  },
);

const refreshTokenModel = model('refreshToken', refreshTokenSchema);
export default refreshTokenModel;
