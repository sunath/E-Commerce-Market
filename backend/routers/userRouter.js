const express = require("express")

const router = express.Router()
const {UserModel} = require("../models")
const validation = require("validate-my-express")
const commonValidations = require("validate-my-express/commonValidators")
const checkEmail = require("../utils/emailchecker")
const {sendAuthenticationMail} = require("../mailsender")
const checkUniquness = require("../utils/uniqueChecker")
const argon2 = require("argon2")
const jsonwebtoken = require("jsonwebtoken")
const {basicUserSecurity} = require("../midddlewares/userSecurity")
// const { user } = require(".")


const createUserToken = (username,e) => jsonwebtoken.sign({username,id:e._id,activated:e.activated},process.env.USER_AUTH_KEY,{
    expiresIn:(1000*60*60*24*7)+"ms"
})


// Create post form validation
const userValidations = validation.createValidator([
    {
        property:"name",
        validators:[commonValidations.isRequired("Name is required"),commonValidations.minLength(3,"Name must contains at least three letters")],
        asyncValidators:[]
    },
    {
        property:"email",
        validators:[commonValidations.isRequired("Email is required"),checkEmail],
        asyncValidators:[(email) =>  checkUniquness(UserModel,{email:email},{'error':"User email is already taken",'status':400})]
    } , 


    {
        property:"username",
        validators:[commonValidations.isRequired("Username is required"),commonValidations.minLength(3,"Username must contain al least 3 characters")],
        asyncValidators:[ (username) => checkUniquness(UserModel,{username},{error:"Username is already taken",'status':400})]
    },

    {

        property:"password",
        validators:[commonValidations.isRequired("Password is required"), commonValidations.minLength(8,"Password at least must contain 8 letters")],
        asyncValidators:[]
    },
],[])

// This route is responsible for creating new user in our applicartion
router.post("/",userValidations,async (req,res) => {
    // Get the user data
    const body = req.body
   
    // Hash the password
    const newPassword = await argon2.hash(body['password'])
    body['password'] = newPassword

    // Add our custom activation code so we can verify user by sending the code to their email
    const userActivationCode = Array(4).fill(0).map( (_,i) => Math.floor(Math.random() * 10)).join('')
    body['activation'] = userActivationCode

    // Create the user
    const user = UserModel(body)

    // Save it on the database
    user.save().then(e => {
        // Send the authentication email
        sendAuthenticationMail(userActivationCode,body.email,(e,i) => {
            console.log(e,i)
            return res.status(201).send({'success':true})
        })
        // return res.status(201).send({'success':true})
    }).catch(e => {
        console.log(e)
        return res.status(500).send({'error':"Failed to create the user"})
    })
    
})


const loginForm = validation.createValidator([
    {property:"username",validators:[commonValidations.isRequired("Username must be provided"),
    commonValidations.isRequired("Your username or password is incorrect")],
    asyncValidators:[]},

    {property:"password",validators:[commonValidations.isRequired("Password must be provided"),
    commonValidations.minLength(8,"Your username or password is incorrect")],
    asyncValidators:[]}
],[])

router.post("/login",loginForm,async (req,res) => {
    const {username,password} = req.body
    UserModel.findOne({username}).then(async e => {
        if(!e)return res.status(403).send({'error':"Your username or password is incorrect"})
        if(await argon2.verify(e.password,password)){
            const token = createUserToken(username,e)
            return res.status(200).send({'token':token,'type':'Bearer'})
        }else{
            return res.status(403).send({'error':"Your username or password is incorrect"})
        }
    }).catch(e => {
        console.log(e)
        return res.status(500).send({'error':"Internal server error"})
    })
})




// Check user is verified or not
router.get("/verify",basicUserSecurity,async (req,res) => {
    if(!req.headers.tokenPayload.activated){
        return res.status(400).send({'error':"User does not have verified his account"})
    }

    return res.status(200).send({'activated':true})
})



const verifyUserForm = validation.createValidator([
    {
        asyncValidators:[],
        property:"code",
        validators:[commonValidations.isRequired("Code is required"),(e) => {
            if(e.length != 4)return {'error':"Invalid code",status:400}
            return null
        }]
    }
],[])
// Set user verify
router.post("/verify",basicUserSecurity,verifyUserForm,async(req,res) => {
    if(req.headers.tokenPayload.activated)return res.status(400).send({'error':"User is alerady activated"})
    const {id} = req.headers.tokenPayload

    try{
        const user = await UserModel.findOne({_id:id})
        if(user.activation == req.body.code){
            user.activated = true
            await user.save()
            return res.status(202).send({'success':true,'new-token':createUserToken(user.username,user)})
        }else{
            return res.status(400).send({'error':"Invalid code"})
        }
    }catch(ex){
        return res.status(500).send({'error':"Internal server error"})
    }
    
})

module.exports = router