export const indexpage = {
    buttonTry: document.querySelector('.indexpage__button-block-try'),
    updateHandlers: function(){
        this.buttonTry.addEventListener('click', () => {
            window.location.replace('https://listonline.ru/user_test_page');
        })
    },
    start: function(){
        this.updateHandlers();
    }
}
