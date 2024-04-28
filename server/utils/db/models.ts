import mongoose, { Schema } from "mongoose"


const ModelSchema: Schema = new mongoose.Schema({
    name : {type: String, required : true},
    owner : {type: String, required : true},
    tags : {type: String, required : true},
    description : {type: String, required : true},
    icon : {type: String, required : true},
    source : {type: String, required : true},    
    isLocalhost : {type: Boolean, required : true},
});

export const Models = mongoose.model('Models', ModelSchema);
