export const listonline = {
    listonlineLogo: document.querySelector('.listonline__header-logo'),
    updateHandlers: function(){
        this.listonlineLogo.addEventListener('click', () => {
            window.location.replace('https://listonline.ru');
        })
    },
    start: function(){
        this.updateHandlers();
    }
}