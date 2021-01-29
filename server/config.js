const config = {
    manyDir:'/home/listonline',
    adminIP: '50.7.93.83',    
    timeoutDeleteTestPage: 300000,
    defaultContent: function ()  {
        const date = new Date();
        const data = 
        [
            {
                tabName: 'Вкладка №1', activ: true, mainColor: 'rgb(24,119,242,1)',
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
    }
}
module.exports = config;