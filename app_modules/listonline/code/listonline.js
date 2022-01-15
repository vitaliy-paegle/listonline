export const listonline = {
    listonlineLogo: document.querySelector('.listonline__header-logo'),
    updateHandlers: function(){
        this.listonlineLogo.addEventListener('click', () => {
            localStorage.clear();
            window.location.replace('https://listonline.ru');
        })
    },
    start: function(){
        this.updateHandlers();
    }
}