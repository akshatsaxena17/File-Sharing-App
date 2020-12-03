const router=require('express').Router();
const express=require('express');
const File=require('../models/file');
const path=require('path')

router.get('/:uuid',async(req,res)=>{
    try{
        const file=await File.findOne({uuid:req.params.uuid});
        if(!file){
            return res.render('../views/download.ejs',{error:'no such file'});
        }
        return res.render('../views/download.ejs',{
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.size,
            download:`${process.env.BASEURL}/files/download/${file.uuid}`
        });
    }catch(err){
        return res.render('../views/download.ejs',{error:'Something went Wrong'});
    }
});


module.exports=router