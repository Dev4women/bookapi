const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = new express.Router()
router.post('/users/register', async (req, res) => {
    console.log("-----in POST user: ",req.body)
    const user = new User(req.body)
    console.log(user)
    try {
        const secret = 'mysecret'
        const token = jwt.sign({_id: user._id.toString()}, secret)
        console.log("token is: ", token)
        user.tokens = user.tokens.concat({ token })
        await user.save()
        res.status(201).send({ user, token})
    } catch (e) {
        console.log("error: ", e)
    }
})
router.post('/users/login', async( req, res)=> {
    console.log("-----in Login user: ",req.body)
    try {
        const user = await User.findOne({email:req.body.email, password:req.body.password})
        console.log("---user: ", user)
        const secret = 'mysecret'
        const token = jwt.sign({_id: user._id.toString()}, secret)
        console.log("token is: ", token)
        res.status(201).json({
            message: "Logged successfully",
            data: {user, token}
         })
    } catch (error){
        res.status(500).json({
            message: "Internal server error",
            data: {}
         })
    }
})
    module.exports = router