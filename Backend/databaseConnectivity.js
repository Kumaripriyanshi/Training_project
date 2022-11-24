const mongoose=require('mongoose')
const DB_URL="mongodb://localhost:27017/Blogging_Database"
const connectToMongo=()=>{
    mongoose.connect(DB_URL,()=>{
        console.log("Succesfully connected with Database")
    })
}

module.exports=connectToMongo