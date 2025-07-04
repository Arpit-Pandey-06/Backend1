import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";
const user_Schema = new Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true, // use for easy search in database and heavy costly functionaliry only needed then use
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true
    },
    fullName:{
        type: String,
        required:true,
        trim:true,
        index:true
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    avaatar:{
        type:String, // url of thirparty service cloudanary
        required:true 
    },
    coverImage:{
        type:String,
        required:true
    },
    password:{
        type:String, // always in encryped form in plan string so learn latter
        required:[true,"Insert Password neccessary"]
    },
    refersTokens:{
        type:String
    }
},{timestamps:true})

//middleware pre which hash (encrypt) the password by uisng bcrypt method hash which take (string:data,saltorRound) 
// in pre middleware we perform adn function before event ("event",callback(next flag))

user_Schema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash("password",10)
    next()
})

//now we create user defined method by use property "methods" = object name.methods.method_name = now we write the method
// the function(parameter_on_which_action_to_be_or_by_done){}
//below we check the password when user need the confirm or check its password from db after encrypt
// this is done by bcrypt inbulid method "compare"
// it take first arg=parameter and second arg=from db save value by this.var_names
// it use crypto computation so we use async await and it return t/f

user_Schema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)    
}

// ACCESS token method
user_Schema.methods.accessTokenGenerator = function (){
     return jwt.sign(
        {
            // PAYLOAD
            _id:this.id, // access from  db
            email:this.email,
            userName:this.userName,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, //Access Token
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        

    )
}

//Refresh Token Generator (same is access but data is low comapare to access token)
user_Schema.methods.accessTokenGenerator = function (){
     return jwt.sign(
        {
            // PAYLOAD
            _id:this.id // access from  db
        },
        process.env.REFRESH_TOKEN_SECRET, //REFRESH Token
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
 
 


export const User = mongoose.model("User",user_Schema) // this controllers to operate with mongo db
