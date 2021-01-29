import {listonline} from  './listonline.js';
import {colorPanel} from  './color_panel.js';
import {changeArticles} from './change_articles.js';
import {tabsPanel} from './tabs_panel.js';
import {connect} from './connect.js';
document.addEventListener('DOMContentLoaded', () => {
    colorPanel.start();    
    changeArticles.start();
    tabsPanel.start();
    connect.start();
    listonline.start();     
});