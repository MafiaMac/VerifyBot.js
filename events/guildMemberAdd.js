// this goes into events folder

const client = require("../index");
const { Captcha } = require("captcha-canvas");
const { MessageAttachment, MessageEmbed, awaitMessages } = require("discord.js");
const { error } = require("npmlog");

client.on("guildMemberAdd", async (member) => {
    const captcha = new Captcha();
    captcha.async =true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();

    const captchaAttachment = new MessageAttachment(
        await captcha.png,
        "captcha.png"
    );

    const captchaEmbed = new MessageEmbed()
        .setTitle('Verification')
        .setDescription('Please complete this captcha by typing in the green letters')
        .setFooter('You have 15 seconds to complete this or else you will be kicked')
        .setImage('attachment://captcha.png')

    const msg = await member.send({
        files: [captchaAttachment],
        embeds: [captchaEmbed],
    });

    const filter = (message) => {
        if (message.author.id !== member.id) return;
        if (message.content === captcha.text) return true;
        else member.send("You had enter the captcha incorrectly try again")
    };

    try{
     const response = await msg.channel.awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
     });

     if(response) {
         // when verfied
         member.roles.add('944768575414095923');
         await member.send('You had succesfully verify welcome to bob games discord server :)')
     }
    } catch (err) {
        // if it failed
        console.log(err);
        await member.send('You had failed the verification now You had been kicked please rejoin again to be able to try again');
        member.kick('You have not answerd captcha');
    }
});