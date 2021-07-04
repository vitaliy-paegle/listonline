const config = require('./config');
const backendApi = require('./backend_api');
const ID = require('./id');

module.exports = {    
    router:  async function(req, res) {
        switch(req.method){
            case 'GET':
                if (req.query.id == undefined){
                    let id = ID.generateID();
                    await backendApi.makeDir(`server/database/test_${id}`);
                    await backendApi.writeFile(`server/database/test_${id}/content.txt`, JSON.stringify(config.defaultContent()));
                    res.redirect(`https://listonline.ru/user_page/?id=test_${id}`);                    
                    setTimeout(async () => {
                        await backendApi.removeFile(`server/database/test_${id}/content.txt`);
                        await backendApi.removeDir(`server/database/test_${id}`);
                        console.log("delete page")
                    }, config.timeoutDeleteTestPage)
                } else {
                    res.sendFile(`${config.manyDir}/app_modules/listonline/index.html`);
                }
            break;
            case 'POST':
          
            break;
        }        
    }
}
