import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})//this minimize false means that the cart data can be made empty otherwise it wont create an empty object

const userModel = mongoose.models.user  || mongoose.model("user",userSchema);

export default userModel;