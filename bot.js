const {Bot} = require('grammy')
const mysql = require('mysql2/promise')

const bot = new Bot('6596860017:AAH6iYqL2LHQlCAiv2YskMsd126XKwFrUvo')

bot.command("start", (ctx) => ctx.reply("Привет! \nВставь код из Тик Тока и смотри фильм/аниме! 🎬"));
bot.on("message", async (ctx) => {
    const message = ctx.message

    if (!message.text || isNaN(+message.text)) {
        ctx.reply('Можно только код!')
        return
    }

    ctx.reply('🔎 Идет поиск...')

    const connection = await mysql.createConnection({
        host: 'sql.freedb.tech',
        port: 3306,
        user: 'freedb_tgbotadmin',
        password: '!Yr5mjzr%%tp#sd',
        database: 'freedb_tgbotdb',
      });


    try {
        const [results] = await connection.query(
            'SELECT * FROM `films_anime` WHERE `code` = ? ',
            [message.text]
            )
        
        if (results.length === 0) {
            ctx.reply('Ничего не найдено 😢')
            return
        }

        ctx.reply(`Код - ${results[0]?.code} \nСсылка - ${results[0]?.link} \nНазвание -  ${results[0]?.title} \n${results[0]?.description}`)

    } catch (err) {
        ctx.reply('Что то пошло не так 😢')
        return
    }

    
    return
});

bot.start();