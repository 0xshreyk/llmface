import mongoose, { Schema } from "mongoose"


const UserSchema: Schema = new mongoose.Schema({
    creds: {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    data: {
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        age: { type: Number, required: true },
        gender: { type: String },
    },
});

const Users = mongoose.model('Users', UserSchema);
export {Users, UserSchema}