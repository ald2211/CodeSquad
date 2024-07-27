import nodemailer from 'nodemailer'



const verifyEmail=async(email,link,name)=>{
    try{
        const mailConfigurations = {

            from:process.env.USER,
            to: email,
            subject: 'Account Verification',
            html:`
           <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            line-height: 1.6;
            color: #333333;
        }
        .button {
            text-align: center;
            margin: 20px 0;
        }
        .button a {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
        .warning{
            font-size:11px
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="http://localhost:3000/images/codeSquadLogo.png" alt="Company Logo">
        </div>
        <div class="content">
            <h2>Hello, ${name}</h2>
            <p>Thank you for signing up! Please click the button below to verify your email address and complete your registration.<br><span class="warning"> the link will be expired after 10 minutes </span></p>
            
        </div>
        <div class="button">
            <a href=${link}>Verify Email</a>
        </div>
        <div class="content">
            <p>If you did not sign up for this account, you can ignore this email.</p>
            <p>Thank you,<br>The CodeSquad Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 CodeSquad. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

            `
        };
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host:process.env.HOST,
            port:process.env.EMAIL_PORT,
            secure:false,
            auth: {
                user: process.env.USER,
                pass: process.env.APP_Password
            },
            tls: {
                rejectUnauthorized: false,
              },
        });

        //send mail   
        const info= await transporter.sendMail(mailConfigurations);
        console.log('Email Sent Successfully');
       
    }catch(err){
        console.log('failed to send:',err)
    }
}

export default verifyEmail;


