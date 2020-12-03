const mongoose = require('mongoose');
const schema=mongoose.Schema;

const fileschema=new schema({
    //blueprint for data in database
    filename:{type:String,required:true},
    path:{type:String,required:true},
    size:{type:Number,require:true},
    uuid:{type:String,required:true},
    sender:{type:String,required:false},
    receiver:{type:String,required:false},
},{timestamps:true});//fields created at updated at will be added

module.exports=mongoose.model('File',fileschema);