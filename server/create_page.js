const config = require('./config');
const ID = require('./id');
const qrcode = require('qrcode');
const backendApi = require('./backend_api');

const createPage = {    
    router: async function(req, res) {
        switch(req.method){
            case 'GET':
                let id = ID.generateID();  
                async function generateQR(){                      
                    if ((await backendApi.makeDir(`./database/${id}`)).successful) {
                        return new Promise((res, rej) => {
                            qrcode.toFile(`./database/${id}/${id}.png`, `https://listonline.ru/user_page?id=${id}`, 
                            {color: {dark: '#000', light: '#0000'/* Transparent background */}},
                            (err) => {err ? rej(err) : res()}
                            )
                        })
                        .then(() => {return {successful: true}})
                        .catch((err) => {return {successful: false, error: err}})
                    }
                }                              
                if (req.headers['x-forwarded-for'] == config.adminIP) {                    
                    if ((await generateQR()).successful) {
                        backendApi.writeFile(`./database/${id}/content.txt`, JSON.stringify(config.defaultContent()))
                    }
                    res.sendFile(`${config.manyDir}/app_modules/admin/index.html`);                    
                } else {
                    console.log(`IP не верен для действия администратора. Ваш IP: ${req.headers['x-forwarded-for']}`)
                    res.redirect("/indexpage/index.html");
                }
            break;
        }        
    },
    createPageForUser: async function(id) {         
        async function generateQR(id){                      
            if ((await backendApi.makeDir(`server/database/${id}`)).successful) {
                return new Promise((res, rej) => {
                    qrcode.toFile(`server/database/${id}/${id}.png`, `https://listonline.ru/user_page?id=${id}`, 
                    {color: {dark: '#000', light: '#0000'/* Transparent background */}},
                    (err) => {err ? rej(err) : res()}
                    )
                })
                .then(() => {return {successful: true}})
                .catch((err) => {return {successful: false, error: err}})
            }
        }                              
                          
        if ((await generateQR(id)).successful) {
            backendApi.writeFile(`server/database/${id}/content.txt`, JSON.stringify(config.defaultContent()))
        }                  
        
    }        
}

module.exports = createPage