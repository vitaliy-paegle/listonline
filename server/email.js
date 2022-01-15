const config = require('./config');
const backendApi = require('./backend_api');
const nodemailer = require('nodemailer');
const ID = require('./id');
const createPage = require('./create_page');

module.exports = {
  router:  async function(req, res) {
    switch(req.method){
      case 'GET':
      break;

      case 'POST':
        let dbConfig = JSON.parse((await backendApi.readFile('server/database/config.json')).content);
        console.log(req.body.email)
        switch (req.body.action) {
          case 'create code':
            let emailCode = ID.generateEmailCode();            
            let findUser = false;
            dbConfig.users.forEach((user) => {
              if(user.email == req.body.email) {
                user.code = emailCode;
                findUser = true;
              }
            });
            if (findUser == true) {
              await backendApi.writeFile('server/database/config.json', JSON.stringify(dbConfig));
              await this.sendMail(req.body.email, emailCode);
              res.send(emailCode)
            } else {
              let id = ID.generateID();
              let emailCode = ID.generateEmailCode();
              await createPage.createPageForUser(id);
              dbConfig.users.push(
                {"email": req.body.email,"id": id,"code": emailCode}
              );
              await backendApi.writeFile('server/database/config.json', JSON.stringify(dbConfig));
              await this.sendMail(req.body.email, emailCode);
              res.send();
            }
          break;

          case 'check code':
            dbConfig = JSON.parse((await backendApi.readFile('server/database/config.json')).content);
            dbConfig.users.forEach((user) => {
              if(user.email == req.body.email && user.code == req.body.code) {
                res.send(JSON.stringify({userID: user.id}))
              }
            });
          break;
        }
      break;
    }        
  },   
  sendMail: async function(destination, text) {

    let transporter = nodemailer.createTransport(config.emailInfo);

    let info = await transporter.sendMail({
      from: "mail@listonline.ru",
      to: destination,
      subject: "ListOnline.ru вход в аккаунт",
      text: "Код: " + text,
      //html: "<b>Hello world?</b>"
    });
    return info;      
  }
}
