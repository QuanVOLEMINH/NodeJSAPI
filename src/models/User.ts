import { Schema, model } from 'mongoose';

let UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    age: { type: Number }
});
const userModel = model('User', UserSchema);
export default userModel;