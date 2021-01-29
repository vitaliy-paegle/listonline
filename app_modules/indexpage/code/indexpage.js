export const indexpage = {
    indexlogo: document.querySelector('.indexpage__logo'),
    updateHandlers: function(){
        this.indexlogo.addEventListener('click', () => {
            window.location.replace('https://listonline.ru/user_test_page');
        })
    },
    start: function(){
        this.updateHandlers();
    }
}
