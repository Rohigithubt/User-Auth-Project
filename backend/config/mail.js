const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path =require('path');
let transporter  = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "f518e1b7d5854d",
    //   pass: "75a6ff84dc2f60"

    host: process.env.MAILTRAP_ENDPOINT,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    } 
  });
  let renderTemplate = (token,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../template', relativePath),
        token,
        function(err, template){
            if (err){console.log('error in rendering template',err); return}
            mailHTML = template;
        }
    )
    return mailHTML;
  }

module.exports = {
    
    transporter: transporter,
    renderTemplate : renderTemplate
}