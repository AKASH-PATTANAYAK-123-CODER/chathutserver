const Log_out=(req,res)=>{
    try{
        res.clearCookie('chathuttoken',{domain :'chathutmessageappbackend.onrender.com'});
        res.status(200).json("Logout");
    }
 catch(error){
    res.status.json("Server Error 404")
 }
}

module.exports=Log_out;