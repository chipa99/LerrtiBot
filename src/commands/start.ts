import { InlineKeyboard } from "grammy";
import { User } from "../models/User";
import { myContext } from "../types";

export const start = async (ctx: myContext) => {
    if (!ctx.from) return ctx.reply('User info is unavailable');
    const { id: telegramID, first_name: firstname, username } = ctx.from;

    try {
        const keyboard = new InlineKeyboard().text('Menu', 'menu');
        const existingUser = await User.findOne({ telegramID });

        if (existingUser) {
            return ctx.reply('Hi, nice to see you here again!', {
                reply_markup: keyboard
            });
        };
        const newUser = new User({ telegramID, firstname, username });

        await newUser.save();
        return ctx.reply(`Hi, nice to see you here, newbie!`, {
            reply_markup: keyboard
        });
    } catch (error) {
        console.error('Something went wrong, during auth', error);
        await ctx.reply('An exeception occured, please try again later');
    };
}