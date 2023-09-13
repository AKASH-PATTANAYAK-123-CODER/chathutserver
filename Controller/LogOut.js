const Log_out=async(req,res)=>{
    try{
        await res.clearCookie('chathuttoken',{httpOnly:false,secure:true,sameSite:"none",domain:'chathutmessageappbackend.onrender.com'});
        res.status(200).json("Logout");
    }
 catch(error){
    res.status.json("Server Error 404")
 }
}

module.exports=Log_out;