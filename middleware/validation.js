
const validationTerms = ['body','params','query']


exports.validation = (schema)=>{

    return(req,res,next)=>{
        const validationResult =[];
        validationTerms.forEach((key)=>{
            if(schema[key]){
                const validate = schema[key].validate(req[key],{abortEarly:false});
                if(validate.error){
                    validationResult.push(validate.error.details)
                }
            }
        })
     
       if(validationResult.length){
            res.json({
                message:"validation error",
                err :validationResult
            })
       }
       else{
        next();
       }
    }
}