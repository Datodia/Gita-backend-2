const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: false
    },
    isSmoker: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)