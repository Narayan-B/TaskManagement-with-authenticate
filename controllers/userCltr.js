const { validationResult } = require("express-validator")
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User = require("../models/usermodel")
const userCltr={}
userCltr.Register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const salt =await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.password,salt)
        const user=new User(body)
        user.password=hashPassword
        await user.save()
        return res.status(201).json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({errors:'something went wrong'})
    }
}
userCltr.Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        //console.log(user.role)
        if (user) {
            const isAuth = await bcryptjs.compare(password, user.password);
            if(isAuth){
                const tokenData = {
                    id: user._id,
                    role:user.role
                };
                console.log('tokenDta',tokenData)
                const token = jwt.sign(tokenData, process.env.SECRETKEY, { expiresIn: '5d' });
                //console.log(token)
                return res.json({ token:token });

            }
                return res.status(400).json({ error: 'Invalid email/password' });
            
        }
            return res.status(400).json({ error: 'Invalid email/password' });
        }catch(err){
            console.log(err)
            res.json(err)
        }
    }


userCltr.Account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        //console.log(req.user)
        res.json(user)
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}
userCltr.users=async(req,res)=>{
    try{
        const users=await User.find();
        // Extract names from the user objects and create an array
        // Send the array of user names as the response
        res.json(users);
    } catch (error) {
        console.error('Error fetching user names:', error);
        // If an error occurs, send an error response
        res.status(500).json({ error: 'Internal server error' })

    }
}

module.exports=userCltr