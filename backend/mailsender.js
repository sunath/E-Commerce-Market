
const nodemailer = require("nodemailer")


let transporter;


// Send email via transporter
const send = (mail,callback) => {

        
        transporter = nodemailer.createTransport({
            host:"smtp-relay.sendinblue.com",
            port:587,
            secure:false,
            auth:{
                user:"sunath2007@gmx.com",
                pass:"WSazYdNpDvgBIm4h"
            },
            // url:"mail.gmx.com",
        })
      
    

    transporter.sendMail(mail,callback)
}

// Send the authentication code to the user
const sendAuthenticationMail = (code,useremail,callback) => {
    const email = {
        from:"sunath2007@gmx.com",
        subject:`${useremail},Activate your account`,
        to:useremail,
        html:`activation code ${code}`

    }

    send(email,callback)

}


module.exports = {
    sendMail:send,
    sendAuthenticationMail
}


