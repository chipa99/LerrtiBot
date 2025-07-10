import "dotenv/config";
import { Bot, GrammyError, HttpError } from "grammy";
import mongoose from "mongoose";
import { start, profile, products, menu, buyProduct } from './commands/index';
import { hydrate } from "@grammyjs/hydrate";
import { myContext } from "./types";

// Creating of the bot
const BOT_API_KEY = process.env.BOT_TOKEN;
if (!BOT_API_KEY) throw new Error('BOT_API_KEY is not defined');
const bot = new Bot<myContext>(BOT_API_KEY);
bot.use(hydrate());

// Responses for commands start stands for /start, etc.
bot.command('start', start);
bot.callbackQuery(['menu', 'back'], menu);
bot.callbackQuery('products', products);
bot.callbackQuery('profile', profile);
bot.callbackQuery(/^buyProduct-\d+$/, buyProduct);

// Handling probable errors according to docs
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

// Start of the bot
async function startBot() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined')
  try {
    await mongoose.connect(MONGODB_URI);
    bot.start();
    console.log('MongoDB connected, Bot started')
  } catch (error) {
    console.error("Error in start of the bot: ", error);
  }
}

startBot();
