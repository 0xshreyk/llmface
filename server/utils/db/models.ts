import mongoose, { Schema } from "mongoose"


const ModelSchema: Schema = new mongoose.Schema({
    model_name : {type: String, required : true},
    model_id : {type: String, required : true},
    model_owner : {type: String, required : true},
    model_tags : {type: String, required : true},
    model_description : {type: String, required : true},
    model_icon_url : {type: String, required : true},
    method_selector : {type: String, required : false},
    model_source : {type: String, required : true},    
    isLocalhost : {type: Boolean, required : true},
});

export const Models = mongoose.model('Models', ModelSchema);
