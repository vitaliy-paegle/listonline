import {config} from './config.js'
export const indexpage = {
    indexpage: document.querySelector('.indexpage'),
    indexpageLogo: document.querySelector('.indexpage__logo'),    
    indexpageLogoHtml: 
        `<section class="indexpage__logo">
            <div class="indexpage__logo-part-1">
                <span class="indexpage__logo-part-1-list">List</span><span class="indexpage__logo-part-1-online">Online</span>
            </div>
            <div class="indexpage__logo-part-2">электронный блокнот</div>
        </section>`,
    indexpageRegistrationHtml:
        `<section class="indexpage__registration">            
            <input type="text" placeholder="e-mail" class="indexpage__registration-block-email-field">
            <button class="indexpage__registration-button-ok">OK</button>                 
        </section>`,
    updateHandlers: function(){        
        if (this.indexpage.getAttribute('state') == 'logo') {
            const indexpageLogo = document.querySelector('.indexpage__logo');        
            indexpageLogo.addEventListener('click', () => {
                this.checkUser() ? window.location.replace(`https://listonline.ru/user_page?id=${localStorage['listID']}`):
                this.indexpage.innerHTML = this.indexpageRegistrationHtml;
                this.indexpage.setAttribute('state', 'registration');
                this.updateHandlers();
            })
        }
    },
    checkUser: function(){
        //localStorage.setItem('listID', '968rov298ryl');
        if (localStorage['listID'] != undefined) {
            return true
        } else {
            return false
        }
    },
    // buttonTry.addEventListener('click', () => {
    //     window.location.replace('https://listonline.ru/user_test_page');                
    // })
    // preloadImages: function(arrayImages){
    //     arrayImages.forEach((adress) => {
    //         let image = document.createElement('div');
    //         image.style.backgroundImage = `url(${adress})`;
    //         this.indexpage.append(image);
    //         setTimeout(() => {image.remove()},10000)
    //     });
    // },
    start: function(){
        this.updateHandlers();        
        // this.preloadImages(config.arrayImages);
    }
}
