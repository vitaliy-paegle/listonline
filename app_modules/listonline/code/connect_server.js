import {infoWindow} from './info_window.js';
import {config} from './config.js';
export const connectServer = {
    getData: function(obj, address){
        let answer = false
        setTimeout(() => {answer == false ? infoWindow.preloader('start') : ""},config.preloaderTimeout)
        obj.action = "getData";
        return fetch(address,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(obj)
            }
        )  
        .then((response) => {return response.json()})
        .catch((error) => {            
            infoWindow.serverConnectionError('Ошибка при получении данных с сервера')
        })       
        .then((result) => {
            infoWindow.preloader('stop');
            answer = true;
            if (result.successful) {
                return result.content
            }  else {
                console.log(`Ошибка при получении данных с сервера: ${JSON.stringify(result.error)}`);                
                window.location.search.indexOf('test') == -1 ? infoWindow.serverConnectionError('Ошибка при получении данных с сервера', ['main', 'repeat']) : infoWindow.serverConnectionError('Вы используете пробную версию блокнота ListOnline. Для получения полной версии необходимо зарегестрироваться.', ['main'])
            } 
        })
        
    },
    setData: function(obj, address){
        let answer = false
        setTimeout(() => {answer == false ? infoWindow.preloader('start') : ""},config.preloaderTimeout)
        obj.action = "setData";        
        return fetch(address,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(obj)
            }
        )        
        .then((response) => {return response.json()})
        .catch((error) => {console.log(error)})       
        .then((result) => {
            infoWindow.preloader('stop');
            answer = true;                       
            return result.successful ? 'successful' : console.log(`Ошибка при записи данных на сервер: ${JSON.stringify(result.error)}`)            
        })
    }
}