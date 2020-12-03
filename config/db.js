require('dotenv').config();
const mongoose = require('mongoose');

function connectdb(){
    mongoose.connect(process.env.CONNECT_URL,{ useUnifiedTopology:true,useFindAndModify:true,useCreateIndex:true,useNewUrlParser:true});
    const connect=mongoose.connection;
    connect.once('open',()=>{
        console.log('Connection open');
    }).catch(err=>{
        console.log('Connection failed to open');
    })
}
module.exports=connectdb;