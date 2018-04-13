import { Schema, model } from 'mongoose';

let UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    age: { type: Number }
});
const userSchema = model('User', UserSchema);
export default userSchema;