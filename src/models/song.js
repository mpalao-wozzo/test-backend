import { Schema, model } from 'mongoose';

const songSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true, maxlength: 75 },
  imgUrl: { type: String, maxlength: 1000 },
  songUrl: { type: String, maxlength: 1000 },
  artistId: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  genreId: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
  releaseDate: { type: String },
  album: { type: String, trim: true, maxlength: 75 },
  active: { type: Boolean, default: true, require: true },
  deleted: { type: Boolean, default: false, required: true },
});

const songModel = model('song', songSchema);
export default songModel;
