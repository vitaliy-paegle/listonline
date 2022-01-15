import {changeArticles} from './change_articles.js';
import {tabsPanel} from './tabs_panel.js';
import {connectServer} from './connect_server.js'
export const connect = {
    exchangeDataServer: async function(action, content) {                
        //const searchString = new URLSearchParams(window.location.search);
        let data;
            switch (action) {
                case 'getData':
                    //data = await connectServer.getData({id: searchString.get('id')},'https://listonline.ru/user_page/get_data');
                    data = await connectServer.getData({id: localStorage.getItem(`listID`)},'https://listonline.ru/user_page/get_data');
                    console.log(JSON.parse(data))
                    return data != undefined ? JSON.parse(data) : [];                    
                break;            
                case 'setData':
                    //data = await connectServer.setData({id: searchString.get('id'), content: content},'https://listonline.ru/user_page/set_data');
                    data = await connectServer.setData({id: localStorage.getItem(`listID`), content: content},'https://listonline.ru/user_page/set_data');
                    return data == 'successful' ? data : 'error';                    
                break;
            }
 
    },

    exchangeDataLS: async function(action, content){
        //const searchString = new URLSearchParams(window.location.search);
        const id =  localStorage.getItem(`listID`);
        
        switch (action) {
            case 'getData':
                if (localStorage.getItem(`qrboard_${id}`) == null) {
                    let data = await this.exchangeDataServer('getData');                    
                    this.exchangeDataLS('setData', data);
                    return this.exchangeDataLS('getData');
                } else {
                    return JSON.parse(localStorage.getItem(`qrboard_${id}`))               
                 }                
            break;
            case 'setData':                
                localStorage.setItem(`qrboard_${id}`, JSON.stringify(content))
            break;        

        }

    },
    controller: async function(data){
        console.log(data)              
        let currentData = await this.exchangeDataLS('getData');
        switch (data.action){
            case 'add_tab':
                let newTab = 
                {
                    tabName: 'Новая вкладка', activ: true, mainColor: '#b6b6b6',
                    articles: []
                }
                currentData.forEach((elem) => {elem.activ = false});
                currentData.unshift(newTab);
                this.exchangeDataLS('setData', currentData);
                changeArticles.updateContentArticles('update_articles');
                tabsPanel.updateContentTabs('add_tab');
                this.exchangeDataServer('setData', currentData);
            break;
            case 'edit_tab':
                currentData.forEach((elem) => {
                    if (elem.activ) {                        
                        elem.tabName = data.data
                    }
                });
                this.exchangeDataLS('setData', currentData);
                tabsPanel.updateContentTabs('edit_tab');
                this.exchangeDataServer('setData', currentData);
            break;
            case 'delete_tab':
                currentData.forEach((elem, index) => {
                    if (elem.activ) {
                        currentData.splice(index, 1);
                    }
                });
                if (currentData[0] != undefined) { currentData[0].activ = 'true';}
                this.exchangeDataLS('setData', currentData);
                this.controller({activTab: 0});
                changeArticles.updateContentArticles('update_articles');
                tabsPanel.updateContentTabs('delete_tab');
                this.exchangeDataServer('setData', currentData);
            break;
            case 'activation_tab':
                currentData.forEach((elem, num)=> {
                    if (num == data.data) {
                        elem.activ = true;
                    } else {
                        elem.activ = false;
                    }
                });
                this.exchangeDataLS('setData', currentData); 
                changeArticles.updateContentArticles('update_articles');
                tabsPanel.updateContentTabs('activation_tab');               
                this.exchangeDataServer('setData', currentData);
            break;
            case 'change_color':                
                currentData.forEach((elem) => {
                    if (elem.activ) {
                        elem.mainColor = data.data;
                    }
                });
                this.exchangeDataLS('setData', currentData);
                tabsPanel.updateContentTabs('change_color');
                changeArticles.updateContentArticles('change_color');
                this.exchangeDataServer('setData', currentData);
            break;
            case 'update_articles':
                currentData.forEach((elem) => {
                    if (elem.activ) {
                        elem.articles = data.data;
                    }
                });
                this.exchangeDataLS('setData', currentData);
                changeArticles.updateContentArticles('update_articles');
                this.exchangeDataServer('setData', currentData);
            break;       
        }
    },
    closePageEvent: function(){
        window.addEventListener('beforeunload', () => {
            //localStorage.clear();
        })
    },
    start: function(){
        this.closePageEvent();
    }

}