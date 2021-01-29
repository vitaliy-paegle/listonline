import {connect} from './connect.js';
import {tabsPanel} from './tabs_panel.js'
export const changeArticles = {
    buttonAddArticle: document.querySelector('.listonline__header-button-block-add-article'),
    articleArea: document.querySelector('.listonline__basic-article-area'),
    buttonsEditArticle: document.getElementsByClassName('listonline__article-button-panel-edit'),
    buttonsDeleteArticle: document.getElementsByClassName('listonline__article-button-panel-delete'),
    articlesContent: document.getElementsByClassName('listonline__article-content'),
    articles: document.getElementsByClassName('listonline__article'),
    maxNumberOfArticles: 9,
    updateHandlers: function(){
        for (let elem of this.buttonsDeleteArticle) {
            elem.addEventListener('click', this.deleteArticle.bind(this))
        }

        for (let elem of this.articlesContent) {
            elem.addEventListener('paste', (event) => {
                event.preventDefault();
            })
        }

        for (let elem of this.articles) {
            elem.addEventListener('touchstart', this.showButtonPanel)
        }

        if (navigator.maxTouchPoints == 0) {
            for (let elem of this.articles) {
                elem.addEventListener('dblclick', this.showButtonPanel)
            }
        }

        for (let elem of this.buttonsEditArticle) {
            elem.addEventListener('click', this.editArticle.bind(this))
        }

        for (let elem of this.articles) {
            elem.addEventListener('keyup', this.title.bind(this))
        }

        window.addEventListener('blur', () => {
            for (let elem of this.articlesContent) {
                elem.blur();
            }
        })      
    },
    addArticle: function(){ 
        this.buttonAddArticle.addEventListener('click', (event) => {            
            if (this.articles.length <= this.maxNumberOfArticles) {
                tabsPanel.openCloseTabsPanel('changeArticles');
                if (this.articlesContent[0] == undefined || this.articlesContent[0].innerHTML != "" ) {
                    let newArticle =
                    `<div id="activ" class="listonline__article">
                        <div class="listonline__article-content" contenteditable="true" spellcheck="false"></div>
                        <div class="listonline__article-screen" style="display:none"></div>
                        <div class="listonline__article-button-panel" style="display:none">
                            <button class="listonline__article-button-panel-edit"></button>
                            <button class="listonline__article-button-panel-delete"></button>
                        </div>
                        <div class="listonline__article-date-panel">
                            <div class="listonline__article-date-panel-date"></div>
                            <div class="listonline__article-date-panel-time"></div>
                        </div>
                    </div>`;
                    this.articleArea.innerHTML = newArticle + this.articleArea.innerHTML;                    
                    this.articlesContent[0].focus();
                    this.articleLoseFocus(this.articles[0]);                    
                    this.updateHandlers();
                } else {
                    return
                }                
            } else {
                return
            }
        })         
    },
    deleteArticle: function(event){
        event.target.parentNode.parentNode.remove();
        this.saveArticlesContent();
    },
    editArticle: function(event){
        tabsPanel.openCloseTabsPanel('changeArticles');
        let article = event.target.parentNode.parentNode;
        let range = document.createRange();
        this.articleLoseFocus(article);
        article.querySelector('.listonline__article-screen').style.display = 'none';
        article.id = 'activ';      
        article.querySelector('.listonline__article-button-panel').style.display = 'none';
        if (article.querySelector('.listonline__article-content').innerHTML == "") {
            range.setStart(article.querySelector('.listonline__article-content'), 0)
        } else {
            range.setStartAfter(article.querySelector('.listonline__article-content').lastChild);
        }        
        range.collapse(true);       
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);       
    },
    articleLoseFocus: function(article){
        function checkEndResizingWindow() {
            let windowHeight = window.innerHeight;
            let check = setInterval(() => {
                if (windowHeight != window.innerHeight) {
                    windowHeight = window.innerHeight;
                } else {
                    clearInterval(check);
                    window.addEventListener('resize', deactivArticles)
                }
            }, 1000)
        }
        function deactivArticles(){
            for (let elem of changeArticles.articlesContent) {
                elem.blur();
            }
            window.removeEventListener('resize', deactivArticles)
        }
        checkEndResizingWindow();
        this.updateDate(article);
        article.querySelector('.listonline__article-content').addEventListener('blur', this.saveArticlesContent.bind(this));
        
    },
    saveArticlesContent: function(data){
        let articlesData = [];
        for (let elem of this.articles) {     
            let article = {
                content: elem.querySelector('.listonline__article-content').innerHTML,
                date: elem.querySelector('.listonline__article-date-panel-date').innerHTML,
                time: elem.querySelector('.listonline__article-date-panel-time').innerHTML,
            }
            articlesData.push(article)
        }
        connect.controller({action: 'update_articles', data: articlesData});
    },
    showButtonPanel: function(eventStart){
        let buttonPanel = this.querySelector('.listonline__article-button-panel');
        function show() {            
            buttonPanel.style.display = 'flex';
            setTimeout(() => { buttonPanel.style.display = 'none' }, 2000)
        }
        switch(eventStart.type) {
            case 'dblclick':
                // console.log('dblclick')
                if (this.id != 'activ') {                    
                    if (eventStart.type == 'dblclick' && getComputedStyle(buttonPanel).display != 'flex') { show() }
                }
            break;
            case 'touchstart':
                // console.log('touchstart')
                if (this.id != 'activ') {
                    let longPress = true;
                    eventStart.target.addEventListener('touchend', () => {
                        longPress = false;
                    })
                    eventStart.target.addEventListener('touchmove', () => {
                        longPress = false;
                    })
                    setTimeout(() => {
                        if (longPress) { show() }
                    }, 500)
                }  
            break;

        }          
    },
    title: function(event){
        if (event.target.childNodes.length > 1) {
            event.target.childNodes.forEach((elem) => {
                if (elem.nodeType == 3) {
                    let data = elem.data;
                    let newDiv = document.createElement('div');            
                    newDiv.innerHTML = data;
                    elem.replaceWith(newDiv);
                    let range = document.createRange();
                    range.setStartAfter(newDiv);
                    range.collapse(true);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
            })
            event.target.childNodes.forEach((elem, index) => {
                if (index == 0) {                    
                    elem.style.fontWeight = '900';
                } else {
                    elem.style.fontWeight = '100';
                }
            })
        }      
    },
    updateDate: function(article){
        let date = new Date();       
        article.querySelector('.listonline__article-date-panel-date').innerHTML = `${date.getDate() <= 9 ? 0 : ""}${date.getDate()}.${date.getMonth() <= 9 ? 0 : ""}${date.getMonth() + 1}.${date.getFullYear()}&nbsp|&nbsp`;
        article.querySelector('.listonline__article-date-panel-time').innerHTML = `${date.getHours() <= 9 ? 0 : ""}${date.getHours()}:${date.getMinutes() <= 9 ? 0 : ""}${date.getMinutes()}`;    
    },
   updateContentArticles: async function(action) {       
        console.log(action);     
        let serverData = await connect.exchangeDataLS('getData');
        function createArticle(content, date, time) {
            let article =
            `<div class="listonline__article">
                <div class="listonline__article-content" contenteditable="true" spellcheck="false" tabindex="-1">${content}</div>
                <div class="listonline__article-screen"></div>
                <div class="listonline__article-button-panel" style="display:none">
                    <button class="listonline__article-button-panel-edit"></button>
                    <button class="listonline__article-button-panel-delete"></button>
                </div>
                <div class="listonline__article-date-panel">
                    <div class="listonline__article-date-panel-date">${date}</div>
                    <div class="listonline__article-date-panel-time">${time}</div>
                </div>               
            </div>`;
            return article;
        }
       switch(action){
            case 'update_page':
                serverData.forEach((elem) => {
                    if (elem.activ) {
                        document.querySelector('body').style.setProperty('--main-color-two', elem.mainColor);
                        elem.articles.forEach((elem) => {
                            this.articleArea.innerHTML = this.articleArea.innerHTML + createArticle(elem.content, elem.date, elem.time);
                        })
                    }
                })
                this.updateHandlers();
            break;
            case 'update_articles':
                this.articleArea.innerHTML = '';
                serverData.forEach((elem) => {
                    if (elem.activ) {                    
                        elem.articles.forEach((article) => {
                            this.articleArea.innerHTML = this.articleArea.innerHTML + createArticle(article.content, article.date, article.time);                             
                        })
                        document.querySelector('body').style.setProperty('--main-color-two', elem.mainColor); 
                    }
                })
                this.updateHandlers();
            break;
            case 'change_color':                
                serverData.forEach((elem) => {
                    if (elem.activ) {
                        document.querySelector('body').style.setProperty('--main-color-two', elem.mainColor);
                    }
                })
            break;
        }
    },  
    start: function(){
        this.addArticle();
        this.updateContentArticles('update_page');
        // this.title();        
    }
}