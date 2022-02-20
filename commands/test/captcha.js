// this goes into test folder

const { Captcha } = require("captcha-canvas");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "captcha",
    run: async (client, message, args) => {
      const captcha = new Captcha();
      captcha.async = true; 
      captcha.addDecoy(); 
      captcha.drawTrace(); 
      captcha.drawCaptcha(); 
      
      message.channel.send({
           files: [captcha.png],
           content: `Code: ${captcha.text}`,
       });

       message.channel.send({
           files: [captchaAttachment],
           content: `Code: ${captcha.text}`,
       });
    },
};