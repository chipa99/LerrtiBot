import { InlineKeyboard } from "grammy";

export const mainMenu = { reply_markup: new InlineKeyboard().text('Products', 'products').text('Profile', 'profile') }
export const backToMenu = { reply_markup: new InlineKeyboard().text('Back to menu', 'back') };