import { Schema, model } from 'mongoose';
import { MAX_LENGTH_NAME, MAX_LENGTH_DESCRIPTION } from '../utils/constants';

const songSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true, maxlength: MAX_LENGTH_NAME },
  imgUrl: { type: String, maxlength: MAX_LENGTH_DESCRIPTION },
  songUrl: { type: String, maxlength: MAX_LENGTH_DESCRIPTION },
  artistId: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  genreId: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
  releaseDate: { type: String },
  album: { type: String, trim: true, maxlength: MAX_LENGTH_NAME },
  active: { type: Boolean, default: true, require: true },
  deleted: { type: Boolean, default: false, required: true },
});

const songModel = model('song', songSchema);
export default songModel;
