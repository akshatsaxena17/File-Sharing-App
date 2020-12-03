const express=require('express');
const path=require('path');
const app=express();
app.use(express.static('public'));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.json());
const PORT=process.env.PORT || 3000;
const connectdb=require('./config/db')
connectdb();
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));
app.get('/',(req,res)=>{
    return res.render('home');
})
app.listen(PORT,()=>{
    console.log(`Up and running at ${PORT}`);
})
