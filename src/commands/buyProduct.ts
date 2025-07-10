import { Product } from './../models/Product';
import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { backToMenu } from "../keyboards";
import { myContext } from "../types";

export const buyProduct = async (ctx: CallbackQueryContext<myContext>) => {
    ctx.answerCallbackQuery();
    const PRODUCTS = await Product.find();
    const productID = Number(ctx.callbackQuery.data.split('-')[1]);
    const product = PRODUCTS.find(({ id }) => id === productID);

    if (!product) return ctx.callbackQuery.message?.editText(`The choice of the product didn't work properly`);
    await Product.findOneAndDelete({ _id: product._id })
    ctx.callbackQuery?.message?.editText(
        `You've successfully bought a product: ${product.name}!`, backToMenu
    )
}