const express =  require('express');

const config = require('./config');
const userPage = require('./user_page');
const createPage = require('./create_page');
const userTestPage = require('./user_test_page');
const email = require('./email');

const app = express();
app.listen(49337);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/listonline', express.static(`${config.manyDir}/app_modules/listonline`));
app.use('/indexpage', express.static(`${config.manyDir}/app_modules/indexpage`));

app.use('/user_page', (req, res) => {
    userPage.router(req, res);
});
app.use('/create_page', (req, res) => {
    createPage.router(req, res);
});
app.use('/user_test_page', (req, res) => {
    userTestPage.router(req, res);
});
app.use('/email', (req, res) => {
    email.router(req, res);
});

app.get('/', (req, res) => {
    res.sendFile(`${config.manyDir}/app_modules/indexpage/index.html`)
});
app.use('*', (req, res) => {
    res.status(404).end()
});




//Роутинг путем последовательной обработки параметров запроса (можно заменить express.static):   

// app.get("/favicon.ico", (req, res) => {    
//     res.sendFile(config.manyDir + "/index_page/image/favicon.ico");
// });

// app.get("/:name_module/:name_file", (req, res) => {
//     console.log(req.url)    
//     res.sendFile(`${config.manyDir}/${req.params.name_module}/${req.params.name_file}`);
// });

// app.get("/:name_module/:name_folder/:name_file", (req, res) => {
//     console.log(req.url)    
//     res.sendFile(`${config.manyDir}/${req.params.name_module}/${req.params.name_folder}/${req.params.name_file}`);
// });

// app.get("/", (req, res) => {
//     console.log(req.url)
//     res.redirect("https://qrboard.ru/index_page/index.html");
// });

// app.get("*", (req, res) => {    
//     res.redirect("/index_page/index.html")
// });

