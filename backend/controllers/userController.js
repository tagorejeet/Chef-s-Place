import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"//using this we will create authentication
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async(req, res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist. Please create one."})

        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
           return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}
    const createToken = (id) =>{
        return jwt.sign({id},process.env.JWT_SECRET)
    }
//register user

const registerUser = async(req,res) =>{
    const {name,password,email} = req.body;
    //to check if the user already exists
    try{
        const exists = await userModel.findOne({email})//this means that if this email is found in any one of the user. Then that account will be stored in this variable.
        if(exists){
            return res.json({success:false, message:"User Already Exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)//the higher the number the strongest the password it will make
        const hashedPassword = await bcrypt.hash(password,salt)//we are passing the user's passowrd and the salt(salt will make the user's password encrypted)
        
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}