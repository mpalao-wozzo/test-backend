import { Schema, model } from 'mongoose';
import { ES, GENDER_MALE, GENDER_FEMALE, LANGS_ARRAY, LOCATION_POINT } from '../utils/constants';

/**
 * The user model
 */
const userSchema = new Schema(
  {
    userRoleId: { type: Schema.Types.ObjectId, ref: 'userRole', required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 100 },
    password: { type: String, required: true, minlength: 6, maxlength: 500 },
    name: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 100 }, // para usuario normal si es obligatorio
    fullName: { type: String, required: true, trim: true, maxlength: 150 },
    birthDate: { type: String, minlength: 10, maxlength: 10 }, // para usuario normal si es obligatorio
    gender: { type: String, enum: [ GENDER_MALE, GENDER_FEMALE ] }, // para usuario normal si es obligatorio
    location: {
      type: { type: String, default: LOCATION_POINT, enum: [ LOCATION_POINT ] },
      coordinates: { type: [ Number ], default: [ 0, 0 ] }, // longitude and latitude
    },
    addressStreet: { type: String, maxlength: 200 },
    addressNumber: { type: String, maxlength: 20 },
    country: { type: String, maxlength: 100 },
    city: { type: String, maxlength: 100 },
    postalCode: { type: String, maxlength: 10 },
    fullAddress: { type: String, maxlength: 300 },
    imageUrl: { type: String, maxlength: 200 },
    language: { type: String, default: ES, enum: LANGS_ARRAY, required: true },
    telephone: { type: String, maxlength: 20 },
    acceptedTerms: { type: Date },
    lastLogin: { type: Date, default: Date.now, required: true },
    active: { type: Boolean, default: false, required: true },
    deleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ location: '2dsphere' });
const userModel = model('user', userSchema);
export default userModel;
