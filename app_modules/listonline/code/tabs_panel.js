import {connect} from './connect.js';
export const tabsPanel = {
    tabs: document.getElementsByClassName('listonline__tab'),
    tabsPanel: document.querySelector('.listonline__tabs-panel'),
    tabsArea: document.querySelector('.listonline__tabs-panel-tabs-area'),
    buttonAddTab: document.querySelector('.listonline__tabs-panel-button-block-add-tab'),
    buttonDeleteTab: document.querySelector('.listonline__tabs-panel-button-block-delete-tab'),
    buttonEditTab: document.querySelector('.listonline__tabs-panel-button-block-edit-tab'),
    buttonOpenTabsPanel: document.querySelector('.listonline__header-button-block-open-tabs-panel'),
    buttonBlock: document.querySelector('.listonline__tabs-panel-button-block'),
    statusPanel: 'close',
    modifyPanel: false,
    renameTab: false,
    handlers: function(){
        this.buttonEditTab.addEventListener('click', this.editTabName.bind(this));
        this.buttonDeleteTab.addEventListener('click', this.deleteTab.bind(this));
        this.buttonOpenTabsPanel.addEventListener('click', this.openCloseTabsPanel.bind(this));
        window.addEventListener('resize', () => {
            if (this.statusPanel == 'open' && this.modifyPanel == false && this.renameTab == false) {
                this.updateHeightTabsArea();
                this.updateContentTabs('update_page');      
            }
            
        });
    },
    updateHandlers: function(){        
        Array.from(this.tabs).forEach((elem) => {
            elem.addEventListener('touchstart', this.showEditButtons.bind(this));
        })
        if (navigator.maxTouchPoints == 0) {
            Array.from(this.tabs).forEach((elem) => {
                elem.addEventListener('dblclick', this.showEditButtons.bind(this));
            })
        }
        Array.from(this.tabs).forEach((elem) => {
            elem.addEventListener('touchstart', this.activateTab.bind(this));
        })
        if (navigator.maxTouchPoints == 0) {
            Array.from(this.tabs).forEach((elem) => {
                elem.addEventListener('click', this.activateTab.bind(this));
            })
        }
    },
    openCloseTabsPanel: function(caller){
        let tabsAreaHeight;
        function rotateButton(obj){
            if (obj.modifyPanel){return}
            let cosAngle = getComputedStyle(obj.buttonOpenTabsPanel).transform.split('(')[1].split(',')[0]
            let rotateAngle = Math.round(Math.acos(cosAngle) * (180 / Math.PI));
            if (rotateAngle == 0) {
                obj.buttonOpenTabsPanel.style.transform = 'rotate(180deg)';
            }
            else if (rotateAngle == 180) {
                obj.buttonOpenTabsPanel.style.transform = 'rotate(0deg)';
            }
        }
        // rotateButton(this);
        tabsAreaHeight = Number(getComputedStyle(this.tabsArea).height.split('px')[0]);
        if (this.modifyPanel) { return };
        if (this.statusPanel == 'close' && caller != 'changeArticles') {
            this.modifyPanel = true;
            this.tabsArea.style.overflowY = 'visible';
            this.tabsPanel.style.height = `${tabsAreaHeight + 92}px`;
            this.tabsArea.scrollTop = 0;
            setTimeout(() => {
                this.statusPanel = 'open';
                this.modifyPanel = false;
            }, 700)
        } else {
            this.modifyPanel = true;
            this.tabsPanel.style.height = '0px';
            setTimeout(() => {
                this.tabsArea.style.overflowY = 'visible';
                this.statusPanel = 'close';
                this.modifyPanel = false;
            }, 700)
        }
    },
    updateHeightTabsArea: function(){
        this.tabsPanel.style.height = 'max-content';
        this.tabsPanel.style.height = getComputedStyle(this.tabsPanel).height;
        this.tabsArea.style.overflowY = "auto";
    },
    addTab: async function(){
        this.buttonAddTab.addEventListener('click', async () => {
            let content = await connect.exchangeDataLS('getData');
            if (content[0] != undefined && content[0].articles.length == 0) {return}
            if (this.tabs.length >= 10) {return}
            connect.controller({action: 'add_tab'});
        })
    },
    showEditButtons:   function (event){
        let longPress = true;
        function showButtons() {
            this.buttonDeleteTab.style.opacity = '1';
            this.buttonEditTab.style.opacity = '1';
            this.buttonDeleteTab.removeAttribute('disabled');
            this.buttonEditTab.removeAttribute('disabled');
        }
        function hideButtons() {
            this.buttonDeleteTab.style.opacity = '0';
            this.buttonEditTab.style.opacity = '0';
            this.buttonDeleteTab.setAttribute('disabled', '');
            this.buttonEditTab.setAttribute('disabled', '');
        }
        switch (event.type) {
            case 'dblclick':
                // console.log('dblclick')
                if (this.id != 'activ') {
                    console.log(this.buttonDeleteTab.getAttribute('disabled'))
                    if (this.buttonDeleteTab.getAttribute('disabled') == '') {
                        showButtons.bind(this)()
                        setTimeout(() => {
                            hideButtons.bind(this)()
                        }, 2000)
                    }
                }
            break;
            case 'touchstart':
                // console.log('touchstart')
                console.log(window.innerHeight, window.innerWidth)
                event.target.addEventListener('touchend', () => {
                    longPress = false;
                })
                event.target.addEventListener('touchmove', () => {
                    longPress = false;
                })
                setTimeout(() => {
                    if (longPress) {
                        showButtons.bind(this)()
                        setTimeout(() => {
                            hideButtons.bind(this)()
                        }, 2000)
                    }
                }, 500)               
            break; 
        }

    },
    activateTab: function(event){            
        Array.from(this.tabs).forEach((elem, index) => {            
            if (elem == event.target.parentNode && elem.getAttribute('state') != 'tab-active') {
                if (this.renameTab == false) {
                    connect.controller({action: 'activation_tab', data: index});
                } else {
                    return                    
                    let timer = setInterval(() => {
                        if (this.renameTab == false) {
                            connect.setData({ activTab: index });
                            clearInterval(timer);
                        }
                    }, 100)
                }
            }
        })        
    },    
    editTabName: function(){
        this.renameTab = true;
        let editableTabIndex;
        Array.from(this.tabs).forEach((tab, index) => {
            if (tab.getAttribute('state') == 'tab-active') {
                editableTabIndex = index;
            }
        })

        setTimeout(() => {document.addEventListener('click', endEditTabName)}, 1000)
        function endEditTabName(event) {
            let target = Array.from(tabsPanel.tabs).indexOf(event.target.parentElement);
            if (target != editableTabIndex) {
                connect.controller({action: 'edit_tab', data: Array.from(tabsPanel.tabs)[editableTabIndex].querySelector('.listonline__tab-content').innerHTML});
                document.removeEventListener('click', endEditTabName);
                tabsPanel.renameTab = false;
                tabsPanel.updateHeightTabsArea();                
            }           
        }
        function cursorToEndTab (tab) {
            let tabContent = tab.querySelector('.listonline__tab-content');
            let range = document.createRange();
            if (tabContent.innerHTML == "") {
                range.setStart(tabContent, 0)
            } else {
                range.setStartAfter(tabContent.lastChild)
            }
            range.collapse(true);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
        Array.from(this.tabs).forEach((tab) => {
            if (tab.getAttribute('state') == 'tab-active'){
                let tabContent = tab.querySelector('.listonline__tab-content');
                tab.querySelector('.listonline__tab-screen').style.display = 'none';
                cursorToEndTab(tab);
                let presentValue = tab.children[0].innerHTML;
                let selection = document.getSelection(); 
                //checkEndResizingWindow();
         
                function deactivTab(){
                    tab.children[0].innerHTML = presentValue;
                    window.getSelection().removeAllRanges();
                    tab.querySelector('.tab__screen').style.display = 'block';
                    connect.controller({ action: 'edit_tab', data: Array.from(tabsPanel.tabs)[editableTabIndex].querySelector('.listonline__tab-content').innerHTML });
                    document.removeEventListener('click', endEditTabName);
                    tabsPanel.renameTab = false;
                    window.removeEventListener('resize', deactivTab)
                }
                function checkEndResizingWindow() {
                    let windowHeight = window.innerHeight;
                    let check = setInterval(() => {
                        if (windowHeight != window.innerHeight) {
                            windowHeight = window.innerHeight;
                        } else {
                            clearInterval(check);
                            window.addEventListener('resize', deactivTab)
                        }
                    }, 1500)
                }

                tabContent.addEventListener('input', (event) => {
                    let cursorPosition = selection.anchorOffset;
                    if (event.data == null && event.inputType != 'deleteContentBackward') {
                        deactivTab();
                    }
                    if (getComputedStyle(tab).width.split('px')[0] > 300) {

                        tab.children[0].innerHTML = presentValue;
                        selection.setBaseAndExtent(tab.querySelector('.listonline__tab-content').childNodes[0], cursorPosition-1, tab.querySelector('.listonline__tab-content').childNodes[0], cursorPosition-1);
                    }
                    presentValue = tab.children[0].innerHTML;
                })

            } else {
                tab.querySelector('.listonline__tab-screen').style.display = 'block';
            }            
        })
    },
    deleteTab: function(){
        Array.from(this.tabs).forEach((elem) => {
            if (elem.getAttribute('state') == 'tab-active') {
                connect.controller({action: 'delete_tab'});
            }
        })
    },
    updateContentTabs: async function(action) {
        console.log(action)
        let serverData = await connect.exchangeDataLS('getData');
        function createTab (mainColor, activ, tabName) {
            let tab =
            `<div class="listonline__tab" style="background-color: ${mainColor}; opacity: ${activ ? 1 : 0.6}" state="${activ ? 'tab-active' : 'tab-not-active'}">
                <div class="listonline__tab-content" style="background-color: ${mainColor}" contenteditable="true" spellcheck="false" tabindex="-1">${tabName}</div>
                <div class="listonline__tab-screen"></div>
            </div>`;
            return tab;
        }
        switch(action){
            case 'update_page':
                this.tabsArea.innerHTML = '';
                serverData.forEach((elem) => {
                    this.tabsArea.innerHTML = this.tabsArea.innerHTML + createTab(elem.mainColor, elem.activ, elem.tabName);        
                })
                this.updateHandlers();
            break;
            case 'add_tab':                
                this.tabsArea.innerHTML = '';
                serverData.forEach((elem) => {
                    this.tabsArea.innerHTML = this.tabsArea.innerHTML + createTab(elem.mainColor, elem.activ, elem.tabName);
                })
                this.updateHeightTabsArea();
                this.updateHandlers();
            break;
            case 'edit_tab':
                this.tabsArea.innerHTML = '';
                serverData.forEach((elem) => {
                    this.tabsArea.innerHTML = this.tabsArea.innerHTML + createTab(elem.mainColor, elem.activ, elem.tabName);        
                })
                this.updateHeightTabsArea();
                this.updateHandlers();
            break;
            case 'delete_tab':
                this.tabsArea.innerHTML = '';
                serverData.forEach((elem) => {
                    this.tabsArea.innerHTML = this.tabsArea.innerHTML + createTab(elem.mainColor, elem.activ, elem.tabName);
                })
                this.updateHeightTabsArea();
                this.updateHandlers();
            break;
            case 'activation_tab':              
                    this.tabsArea.innerHTML = '';
                    serverData.forEach((elem) => {
                        this.tabsArea.innerHTML = this.tabsArea.innerHTML + createTab(elem.mainColor, elem.activ, elem.tabName);                                           
                    })
                    this.updateHandlers();    
            break;
            case 'change_color':
                    this.tabsArea.innerHTML = '';
                    serverData.forEach((elem) => {
                        this.tabsArea.innerHTML = this.tabsArea.innerHTML + createTab(elem.mainColor, elem.activ, elem.tabName);
                    })
                    this.updateHandlers();
            break;
        }
    },
    start: function(){
        this.handlers();
        this.addTab();
        this.updateContentTabs('update_page');
    }
}