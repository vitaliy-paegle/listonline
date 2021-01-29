export const infoWindow = {
    body: document.querySelector('body'),
    preloader: (action) => {        
        if (action == 'start' && document.querySelector('.window-preloader') == null) {
            let body = document.createElement('section');
            body.className = 'window-preloader';
            body.innerHTML = 
                `<div class="window-preloader__background">
                    <div class="window-preloader__window">
                        <div class="window-preloader__point"></div>
                        <div class="window-preloader__point" style="background-color: #cddb00"></div>
                        <div class="window-preloader__point"></div>
                    </div>
                </div>
                <style>
                    .window-preloader{
                        position: fixed; 
                        width: 100%; 
                        height: 100%; 
                        z-index: 10;
                        opacity: 0;
                        transition: opacity 0.2s;
                    }
                    .window-preloader__background{
                        width: 100%;
                        height: 100%;
                        background-color: #b6b6b680;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .window-preloader__window{
                        width: 110px;
                        height: 50px;
                        background-color: white;
                        border-radius: 10px;              
                        display: flex;
                        gap: 20px;
                        justify-content: center;
                        align-items: center;
                    }
                    .window-preloader__point{
                        background-color: #b6b6b6;
                        opacity: 1;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        transition: opacity 0.25s;
                    }
                </style>`;
            infoWindow.body.append(body);
            const points = document.querySelectorAll('.window-preloader__point');                       
            setTimeout(() => {
                document.querySelector('.window-preloader').style.opacity = 1;                                       
            }, 200);
            if (document.querySelectorAll('.window-preloader__point') != null) {
                function flashingDot(numberPoint) {
                    points[numberPoint].style.opacity = 0;
                    setTimeout(() => {points[numberPoint].style.opacity = 1}, 1000)
                    setInterval(() => {                        
                        points[numberPoint].style.opacity = 0;
                        setTimeout(() => {points[numberPoint].style.opacity = 1}, 1000)
                    }, 2000)
                }
                flashingDot(0);
                setTimeout(() => {
                    flashingDot(1)
                }, 250);
                setTimeout(() => {
                    flashingDot(2)
                }, 500);
            }
        } 
        else if (action == 'stop' && document.querySelector('.window-preloader') != null) {
            document.querySelector('.window-preloader').style.opacity = 0
            setTimeout(() => {
                if (document.querySelector('.window-preloader') != null) {
                    document.querySelector('.window-preloader').remove()
                }                
            }, 1000)
        }   
    },
    serverConnectionError: (textError, button) => {
        if (document.querySelector('.window-server-connection-error') == null) {
            let body = document.createElement('section');
            body.className = 'window-server-connection-error';
            body.innerHTML = 
                `<div class="window-server-connection-error__background">
                    <div class="window-server-connection-error__window">
                        <p class="window-server-connection-error__text-error">${textError}</p>
                        <div class="window-server-connection-error__button-block">
                            ${button.indexOf('repeat') != -1 ? `<button class="window-server-connection-error__button-repeat">Повторить</button>`: ``}                            
                            ${button.indexOf('main') != -1 ? 
                                `<a href="https://listonline.ru">
                                    <button class="window-server-connection-error__button-index-page">На главную страницу</button>
                                </a>` : ``
                            }
                        </div>                        
                    </div>
                </div>
                <style>
                    .window-server-connection-error{
                        position: fixed; 
                        width: 100%; 
                        height: 100%; 
                        z-index: 10;
                        opacity: 0;
                        transition: opacity 0.2s;
                        font-size: 16px;
                    }
                    .window-server-connection-error__background{
                        width: 100%;
                        height: 100%;
                        background-color: #b6b6b680;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .window-server-connection-error__window{
                        width: max-content;
                        height: min-content;
                        padding: 10px;
                        background-color: white;
                        border-radius: 10px;              
                        display: flex;
                        flex-direction: column;                       
                        justify-content: center;
                        align-items: center;
                    }
                    .window-server-connection-error__text-error{
                        font-size: 18px;
                        width: 300px;
                        text-align: center;
                    }
                    .window-server-connection-error__button-block{
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                    }
                    .window-server-connection-error__button-repeat{
                        background-color: var(--main-color-three);
                        color: white;
                        border: none; 
                        outline: none;
                        width: max-content;
                        height: 34px;
                        border-radius: 10px;
                        font-size: 16px;
                        
                    }
                    .window-server-connection-error__button-index-page{
                        background-color: var(--main-color-three);
                        color: white;
                        border: none; 
                        outline: none;
                        width: max-content;
                        height: 34px;
                        border-radius: 10px;
                        font-size: 16px;
  
                    }

                </style>`;
            infoWindow.body.append(body);
            document.querySelector('.window-server-connection-error').style.opacity = 1;
        }
    }
}    