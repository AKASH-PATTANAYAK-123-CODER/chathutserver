const mongoose=require("mongoose");

const connectDB = async (DatabaseURL) => {
    try {

        await mongoose.connect(DatabaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        
        console.log("Database connected successfully");
    } 
    
    catch (err) {
        console.error("Error connecting to the database",err);
    }
}

module.exports = connectDB;