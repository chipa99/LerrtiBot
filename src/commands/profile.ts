import { User } from "../models/User";
import { myContext } from "../types";
import { backToMenu } from "../keyboards";
import { CallbackQueryContext } from "grammy";

export const profile = async (ctx: CallbackQueryContext<myContext>) => {
    ctx.answerCallbackQuery();
    const user = await User.findOne({ telegramID: ctx.from?.id });
    if (!user) return console.error('You have to register at first, using /start command');
    const date = user.createdAt.toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' });
    ctx.callbackQuery.message?.editText(`Here's the profile of yours!\nYour name: ${user.firstname} \nYour username: @${user.username} \nYour ID: ${user.telegramID} \nDate of register: ${date}`, backToMenu)
}


