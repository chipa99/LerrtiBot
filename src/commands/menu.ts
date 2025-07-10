import { CallbackQueryContext } from "grammy";
import { mainMenu } from "../keyboards";
import { myContext } from "../types";

export const menu = async (ctx: CallbackQueryContext<myContext>) => {
    ctx.answerCallbackQuery();

    ctx.callbackQuery?.message?.editText(
        `Here's the main menu of the store.\nYou can go either to products section or to the profile of yours. For transfer click the button below:`, mainMenu
    )
}