const mongoose = require ("mongoose")
const validator = require("validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    email: {
        type: String,
        // unique: true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    } ,
    password: {
        type: String,
        // unique: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes("password")) {
                throw new Error("password cannot contain password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value<0) {
                throw new Error("age ne peut pas inferieur a 0")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})
const User = mongoose.model("User", userSchema)
module.exports= User
//Generate auth token and save it in users collection
userSchema.methods.generateAuthToken = async function () {
    const user = this
    //generate the token and sign it with our secret
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    //save token in users collection in DB
    user.tokens = user.tokens.concat({ token })
    await user.save()
    //return the token generated
    return token
}
//find a user by its credentials
userSchema.statics.findByCredentials = async (email, password) => {
    //try to find a user in DB
    const user = await User.findOne({email})
    if (!user){
        throw new Error('Unable to login')
    }
    //compare password entered with hashed password of the user
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
//Hash the plain text password before saving
userSchema.pre('save', async function (next){
    const user = this
    user.password = await bcrypt.hash(user.password, 8)
    next()
})





