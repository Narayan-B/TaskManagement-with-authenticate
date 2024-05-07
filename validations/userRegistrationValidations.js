const User=require('../models/usermodel')
const userRegisterValidationSchema={
    username:{
        in:['body'],
        exists:{errorMessage:'user name is required'},
        notEmpty:{errorMessage:'username not be empty'},
        trim:true

    },
    email:{
        in:['body'],
        exists:{errorMessage:'email is required'},
        notEmpty:{errorMessage:'email should not be empty'},
        trim:true,
        isEmail:{errorMessage:'mail should be valid format'},
        normalizeEmail:true,
        custom: {
            options: async function(value) {
                    const user = await User.findOne({ email: value });
                    if (user) {
                        throw new Error('Email already exists');
                    }else{
                    return true;
                    }
                
            }
        }
        
    },
    password:{
        in:['body'],
        exists:{errorMessage:'pw is required'},
        notEmpty:{errorMessage:'pw should not be empty'},
        isLength:{
            options:{min:8,max:128},
            errorMessage:'password should be b/w 8-128'
        },
        trim:true
    },
    role:{
        in:['body'],
        exists:{errorMessage:'role is required'},
        notEmpty:{errorMessage:'role not be empty'},
        trim:true,
        isIn:{
            options:[['teamlead','employee']],
            errorMessage:'should bbe one of teamlead,employee'
        }


    }
}
module.exports=userRegisterValidationSchema