const config = require('./config');
const backendApi = require('./backend_api')

module.exports = {    
    router:  async function(req, res) {
        switch(req.method){
            case 'GET':                           
                res.sendFile(`${config.manyDir}/app_modules/listonline/index.html`)
            break;
            case 'POST':
                switch(req.body.action){
                    case 'getData':
                        res.send(await backendApi.readFile(`server/database/${req.body.id}/content.txt`))                        
                    break;
                    case 'setData':                        
                        res.send(await backendApi.writeFile(`server/database/${req.body.id}/content.txt`, JSON.stringify(req.body.content)))
                    break;
                }            
            break;
        }        
    }
}
