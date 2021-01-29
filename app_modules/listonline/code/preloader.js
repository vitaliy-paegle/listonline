export const preloader = {
    activationPreloader: function(){        
        let interval = setInterval(() => {            
            if (document.readyState == 'complete') {
                clearInterval(interval);
                document.querySelector('body').style.opacity = 1;                
            }            
        }, 100);
    },
    start: function(){
        this.activationPreloader();
    }
}
preloader.start()