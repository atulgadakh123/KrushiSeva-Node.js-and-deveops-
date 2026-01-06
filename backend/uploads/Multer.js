const multer=require("multer");
const path=require("path")
const fs=require("fs")

const uploadDir=path.join(__dirname,"../src/uploads")

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true})
}
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "src/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)

    }

})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
        
    }
    else{
        cb("Invalid image file!",false)
    }
}


const uploads=multer({storage,fileFilter})

module.exports=uploads