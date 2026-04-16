const jwt= require("jsonwebtoken")


const protect=((req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(404).json({message:"Token was not provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"message":"Server error in middleware function"})
    }
})


const authorize=(req,res,next)=>{
    if(req.user.role!="admin"){
        return res.status(401).json({message:"Unauthorized"})
    }
    next()
}

module.exports={protect,authorize}