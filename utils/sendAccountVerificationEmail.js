const nodemailer= require("nodemailer");
const dotenv = require("dotenv");

// !load dotenv into process object
dotenv.config();

const sendAccountVerificationEmail= async(to,verificationToken)=>{
    try{
        // ! create a transport object
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.APP_PWD
                
            }

        });
        // create the message to be best

        const message={
          
            to,
            subject:"account verification Token",
            html: `<p> you are receiving thsi email you(or someone else) to verify a account</p>
            <p>please click on the following link, or paste this into your browser to complete the process:</p>
            <p>http://localhost:3000/reset-password/${verificationToken}</p>
            <p>if you did not request this, please ignore this email your password will reamin unchanged`
        };
        // ! send the mail
        const info= await transport.sendMail(message);
        console.log("Email sent", info.messageId);

    } catch(error){
        console.log(error);
            throw new Error("email sending failed!");
        

    };
    
};
module.exports=sendAccountVerificationEmail;
 