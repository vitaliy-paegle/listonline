import {config} from './config.js'
export const indexpage = {
    indexpage: document.querySelector('.indexpage'),
    indexpageLogo: document.querySelector('.indexpage__logo'),    
    indexpageMenuHtml: 
    `<section class="indexpage__menu">
        <div class="index__menu-items">
            <button class="indexpage__menu-items-button indexpage__menu-items-button-enter">Войти</button>
            <button class="indexpage__menu-items-button indexpage__menu-items-button-try">Попробовать</button>
            <button class="indexpage__menu-items-button indexpage__menu-items-button-registration">Регистрация</button>
            <button class="indexpage__menu-items-button indexpage__menu-items-button-registration">Контакты</button>                    
        </div>
        <button class="indexpage__menu-button-close"></button>
    </section>`,
    indexpageLogoHtml: 
        `<section class="indexpage__logo">
            <div class="indexpage__logo-part-1">
                <span class="indexpage__logo-part-1-list">List</span><span class="indexpage__logo-part-1-online">Online</span>
            </div>
            <div class="indexpage__logo-part-2">электронный блокнот</div>
        </section>`,
    indexpageRegistrationHtml:
        `<section class="indexpage__registration" style="display: none;">
            <div class="indexpage__registration-block-email">
                <input type="text" class="indexpage__registration-block-email-field">
                <button class="indexpage__registration-block-email-button">ОК</button>
            </div>
            <div class="indexpage__registration-block-remember">
                <label class="indexpage__registration-block-remember-text">Запомнить меня</label>
                <div class="indexpage__registration-block-remember-field"></div>
            </div>
        </section>`,
    updateHandlers: function(){
        if (this.indexpage.getAttribute('state') == 'menu') {
            const buttonTry = document.querySelector('.indexpage__menu-items-button-try');            
            buttonTry.addEventListener('click', () => {
                window.location.replace('https://listonline.ru/user_test_page');
                
            })
        }
        
        if (this.indexpage.getAttribute('state') == 'logo') {           
            this.indexpageLogo.addEventListener('click', () => {
                this.indexpage.innerHTML = this.indexpageMenuHtml;
                this.indexpage.setAttribute('state', 'menu');
                this.updateHandlers();
            })
        }
    },
    changeIndexpageState: function(){

    },
    preloadImages: function(arrayImages){
        arrayImages.forEach((adress) => {
            let image = document.createElement('div');
            image.style.backgroundImage = `url(${adress})`;
            this.indexpage.append(image);
            setTimeout(() => {image.remove()},10000)
        });
    },
    start: function(){
        this.updateHandlers();        
        this.preloadImages(config.arrayImages);
    }
}
