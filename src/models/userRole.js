import { Schema, model } from 'mongoose';
import { ROLES_ARRAY } from '../utils/constants';

/**
 * The userRole model
 */
const userRoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, enum: ROLES_ARRAY },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

const userRoleModel = model('userRole', userRoleSchema);
export default userRoleModel;
