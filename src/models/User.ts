import { Schema, model, Model } from 'mongoose';
import { IUserModel } from '../interfaces/IUserModel';

let UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    age: { type: Number },
});

const userSchema: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export default userSchema;