const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path =require('path');
let transporter  = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "b9f4787097d781",
      pass: "cfc1be598951c3"
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