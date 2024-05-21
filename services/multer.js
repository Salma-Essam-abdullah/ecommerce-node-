const multer = require('multer');
const path = require('path')
const fs = require('fs')






const validationFileType = {
   image : ['image/jpg','image/jpeg','image/png'] 
}; 

function multerFun(customDestination,acceptType){
    const fileFilter = function(req,file,cb){
        if(acceptType.includes(file.mimetype)){
            cb(null,true)
        }else{
            req.fileUploadErr = true;
            cb(null,false)
        }
    }
    if(!customDestination || customDestination == ""){
        customDestination = "generalData"
    }

    if(!fs.existsSync(path.join(__dirname,`../uploads/${customDestination}`))){
        fs.mkdirSync(path.join(__dirname,`../uploads/${customDestination}`),{recursive:true});

    }
    const storage =  multer.diskStorage({
        destination: function(req,file,cb){
            console.log(file);
            req.destinationFile = `uploads/${customDestination}`
            cb(null,path.join(__dirname,`../uploads/${customDestination}`))
        },
        filename:function(req,file,cb){
            console.log({file});
                const fullName = new Date().getMilliseconds() +'-'+file.originalname
                cb(null,fullName)
                
        }
        
    }
)
    const upload = multer({dest : path.join(__dirname,`../uploads/${customDestination}`),fileFilter,storage})
    return upload;
}


module.exports = {multerFun,validationFileType};