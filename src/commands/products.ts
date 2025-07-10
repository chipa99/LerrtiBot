import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { myContext } from "../types";
import { Product } from "../models/Product";


export const products = async (ctx: CallbackQueryContext<myContext>) => {
    ctx.answerCallbackQuery();

    const PRODUCTS = await Product.find();
    const productsList = PRODUCTS.reduce((acc, cur) => {
        return (acc + `- <b>${cur.name}</b>\nPrice: <i>${cur.price}$</i>(USD)\nDescription: ${cur.description}\n\n`);
    }, '');

    // Create buttons for each product
    const productButtons = PRODUCTS.map(({ id, name }) =>
        InlineKeyboard.text(`Buy ${name}`, `buyProduct-${id}`)
    );

    // Group buttons into rows of 3
    const rows = [];
    for (let i = 0; i < productButtons.length; i += 3) {
        rows.push(productButtons.slice(i, i + 3));
    }

    // Add a row for the 'Back to menu' button
    rows.push([InlineKeyboard.text('Back to menu', 'back')]);

    const reply_markup = InlineKeyboard.from(rows);

    ctx.callbackQuery.message?.editText(
        `Here's our products section!\n\n${productsList}`,
        { reply_markup, parse_mode: "HTML" }
    );
};
