import * as cartForWaiterService from "../models/cartForWaiter.js";

export function addCart(newCart) {
    return cartForWaiterService.addCartOrder(newCart);
}

export function getCartOrder(tableNo) {
    return cartForWaiterService.getCartOrder(tableNo);
}

export function updateCard(updatedCart) {
    return cartForWaiterService.updateCartOrder(updatedCart);
}

export function deleteCard(deleteCart) {
    return cartForWaiterService.deleteCartOrder(deleteCart);
}