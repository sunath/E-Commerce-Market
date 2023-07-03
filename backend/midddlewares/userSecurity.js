

const jsonwebtoken = require("jsonwebtoken")

/**
 * if the beraer token is not provided or the token has been expired return an error
 * if the token is valid we are gonna decode the payload and set it as req.headers.tokenPayload
 * @param req : Express Request Object
 * @param res : Express Response Object
 * @param next : Express Next Object
 */
function basicUserSecurity(req,res,next){
    const auth = req.headers.authorization

    if(!auth)return res.status(401).send({'error':"Token is not provided"})
    const token = auth.split("Bearer ")[1]
    try{
        const payload = jsonwebtoken.verify(token,process.env.USER_AUTH_KEY)
        req.headers.tokenPayload = payload
        next()
    }catch(ex){
        console.log(ex)
        if(ex.name == "TokenExpiredError"){
            return res.status(400).send({'error':"Token is expired"})
        }
        return res.status(400).send({'error':"Invalid token"})
    }
}

module.exports = {basicUserSecurity}