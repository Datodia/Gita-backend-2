const { default: mongoose } = require("mongoose")


module.exports = async () => {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@gita-back.4cknv.mongodb.net/?retryWrites=true&w=majority&appName=Gita-back')
        console.log('Connected succesfully')
    }catch(e){
        console.log('could not connect db', e) 
    }
}