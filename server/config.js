const config = {
    manyDir:'/home/listonline',
    adminIP: '50.7.93.83',    
    timeoutDeleteTestPage: 30000,
    defaultContent: function ()  {
        const date = new Date();
        const data = 
        [
            {
                tabName: 'Вкладка №1', activ: true, mainColor: '#0FA958',
                articles: [
                    {
                        content: '<div style="font-weight: 900;">Самое время создать свою первую заметку...</div>',
                        date: `${date.getDate() <= 9 ? 0 : ""}${date.getDate()}.${date.getMonth() <= 9 ? 0 : ""}${date.getMonth() + 1}.${date.getFullYear()}&nbsp|&nbsp`,
                        time: `${date.getHours() <= 9 ? 0 : ""}${date.getHours()}:${date.getMinutes() <= 9 ? 0 : ""}${date.getMinutes()}`
                    }
                ]
            }
        ]
        return data;        
    },
    emailInfo: {
        host: "smtp.jino.ru",
        port: 465,
        secure: true,
        auth: {
          user: "mail@listonline.ru",
          pass: "vv19851985",
        }
    }

}
module.exports = config;