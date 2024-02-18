import { Bot } from 'grammy'

const bot = new Bot('6596860017:AAH6iYqL2LHQlCAiv2YskMsd126XKwFrUvo')

bot.command("start", (ctx) => ctx.reply("HI! Enter code of film"));
// Handle other messages.
bot.on("message", async (ctx) => {
    const message = ctx.message

    if (!message.text) {
        ctx.reply('Only text!')
        return
    }

    if (isNaN(+message.text)) {
        ctx.reply('only number!')
        return
    }

    ctx.reply('Searching...')

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${+message.text}`)
    .then(res => res.json())
    .catch(() => {
        return
    })

    if (!response.title) {
        ctx.reply('Not found!')
        return
    }

    ctx.reply(response.title)
    return
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();