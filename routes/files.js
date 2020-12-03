const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const File=require('../models/file')
const {v4:uuid4}=require('uuid');
//function for storing files in local system
let storage=multer.diskStorage({
    //defining destination for file storage in local system
    destination:(req,file,cb)=>cb(null,'uploads/'),
    //for determining the name of fileuploaded 
    filename:(req,file,cb)=>{
        const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniquename);
    }
})
let upload=multer({
    storage:storage,
    limit:{fileSize:1000000*100}
   
}).single("fileup");

//receive post request
router.post('/',(req,res)=>{
    //Store in database
    upload(req,res,async(err)=>{
       //Check for data in req
        if(!req.file){
            return res.json({error:'Add a file'});
        }
        let ext = path.extname(req.file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext!=='.pdf' && ext !== '.txt' && ext!=='.html' && ext!=='.js' && ext!=='.css') {
            return res.end("Only PDF's, HTML, images, JS or text documents are allowed");
        }

        if(err)
        return res.status(500).send({error:err.message});

        const file=new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path, //destination defined + filename
            size:req.file.size
        });

        const response=await file.save();
        res.render('../views/inter.ejs', {file:`${process.env.BASEURL}/files/${response.uuid}`});
        //file is key and value is the format of the download link
        //

    })
    //send response download link
})


module.exports=router;