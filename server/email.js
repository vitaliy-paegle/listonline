const config = require('./config');
const backendApi = require('./backend_api');
const nodemailer = require('nodemailer');

module.exports = {    
    sendMail: async function(req,res) {

        let transporter = nodemailer.createTransport({
          host: "smtp.jino.ru",
          port: 465,
          secure: true,
          auth: {
            user: "info@listonline.ru",
            pass: "v19851985",
          },
        });

        let info = await transporter.sendMail({
          from: "info@listonline.ru",
          to: "vpaegle@gmail.com",
          subject: "ListOnline.ru вход в аккаунт",
          text: "Код: ",
          //html: "<b>Hello world?</b>"
        });
        res.send(info);       
    }
}
