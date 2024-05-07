
const userLoginValidationSchema={
    email:{
        in:['body'],
        exists:{errorMessage:'email is required'},
        notEmpty:{errorMessage:'email should not be empty'},
        trim:true,
        normalizeEmail:true
    },
    password:{
        in:['body'],
        exists:{errorMessage:'pw is required'},
        notEmpty:{errorMessage:'pw should not be empty'},
        trim:true,
        
    }
}