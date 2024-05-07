const User=require('../models/usermodel')
const taskValidationSchema={
    
        userId: {
            custom: {
                options: async function(value) {
                    // Assuming you have a User model with a findById method
                    const user = await User.findOne(value);
                    if (!user) {
                        throw new Error('User with the provided ID does not exist');
                    } else {
                        return true;
                    }
                }
            }
        },
    
    taskTitle:{
        in:['body'],
        exists:{errorMessage:'task title is required'},
        notEmpty:{errorMessage:'task title should not be empty'},
        trim:true
    },
    description:{
        in:['body'],
        exists:{errorMessage:'description is required'},
        notEmpty:{errorMessage:'description should not be empty'},
        trim:true
    },
    priority:{
        in:['body'],
        exists:{errorMessage:'prority is required'},
        notEmpty:{errorMessage:' priority should not be empty'},
        isIn:{
            options:[['high','low','medium']],
            errorMessage:'priority should be one among the high,medium,low'
        },
        trim:true

    },
    status:{
        in:['body'],
        exists:{errorMessage:'status is required'},
        notEmpty:{errorMessage:'status should not be empty'},
        isIn:{
            options:[['inProgress','open','completed']],
            errorMessage:'priority should be one among the  InProgress,open,completed'
        },
        trim:true
    },
    dueDate:{
        in:['body'],
        exists:{errorMessage:' due date is required'},
        notEmpty:{errorMessage:'due date should not be empty'},
        custom:{
            options:function(value){
                if(value<new Date()){
                    throw new Error('date cannot be exceded todays date')
                }else{
                    return true
                }
            }
        }
    },
    userAssignments:{
        in:['body'],
        exists:{errorMessage:' Assignment is required'},
        notEmpty:{errorMessage:'Assignment should not be empty'},
        trim:true
    }
}
module.exports=taskValidationSchema