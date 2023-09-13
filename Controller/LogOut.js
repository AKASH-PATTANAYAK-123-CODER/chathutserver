const Log_out=(req,res)=>{
    try{
        res.clearCookie('chathuttoken',{ maxAge:86400000,httpOnly:false,secure:true,sameSite:"none",path:'/myapp',domain:'chathutmessageappbackend.onrender.com'});
        res.status(200).json("Logout");
    }
 catch(error){
    res.status.json("Server Error 404")
 }
}

module.exports=Log_out;