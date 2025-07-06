require("dotenv").config();
const {
  Bot,
  GrammyError,
  HttpError,
  Keyboard,
  InlineKeyboard,
} = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
  {
    command: "start",
    description: "Запуск бота",
  },
  {
    command: "id",
    description: "Узнать свой id в Телеграмм",
  },
  {
    command: "help",
    description: "Вспомогательный набор инструментов",
  },
]);

bot.hears(/я Даша/, async (ctx) => {
  await ctx.react("🤩");
  await ctx.reply("Ты очень красивая, Даша", {
    reply_parameters: {
      message_id: ctx.msg.message_id,
    },
  });
});

bot.hears("Пойти нахуй", async (ctx) => {
  await ctx.react("🖕");
  await ctx.reply("Скажи мне, ты дурак. Скажи мне", {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

bot.hears("Посмотреть ролик Юрца", async (ctx) => {
  await ctx.react("🖕");
  await ctx.reply(
    `Получай, фашist, <a href="https://youtu.be/KVDAgoWsNcg?si=tuhllCAkYSZcAT3o">гранату</a>`,
    {
      reply_parameters: { message_id: ctx.msg.message_id },
      parse_mode: "HTML",
    }
  );
});

bot.hears("Похвалить создателя", async (ctx) => {
  await ctx.react("❤‍🔥");
  await ctx.reply("Ой спасибки, я старался❤");
});

bot.command("help", async (ctx) => {
  const labels = [
    "Пойти нахуй",
    "Посмотреть ролик Юрца",
    "Похвалить создателя",
  ];
  const rows = labels.map((label) => {
    return [Keyboard.text(label)];
  });
  const helpKeyboard = Keyboard.from(rows).resized();

  await ctx.reply("Чем вам помочь?", {
    reply_markup: helpKeyboard,
  });
});

// bot.command("keyboard", async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("1", "button-1")
//     .row()
//     .text("2", "button-2")
//     .row()
//     .text("3", "button-3");
//   await ctx.reply("Выберите кнопку", {
//     reply_markup: inlineKeyboard,
//   });
// });

bot.command("start", async (ctx) => {
  await ctx.react("😡");
  await ctx.reply("Опять разбудили..");
});

bot.command("id", async (ctx) => {
  await ctx.reply(`Ваш id - ${ctx.from.id}`);
});

bot.on("msg", async (ctx) => {
  await ctx.reply(
    "Какое нахрен сообщение, я же не могу понять чего тебе надо..."
  );
});

// bot.callbackQuery(/button-[1-3]/, async (ctx) => {
//   await ctx.answerCallbackQuery();
//   await ctx.reply(`Вы нажали кнопку: ${ctx.callbackQuery.data}`);
// });

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}`);

  if (error instanceof GrammyError) {
    console.error("Error in request: ", error.description);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
  } else {
    console.error("Uknown error", error);
  }
});

bot.start();
