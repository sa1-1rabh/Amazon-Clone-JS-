import { renderCartSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
import "../data/backend-practice.js";
import {loadProducts,loadProductsFetch} from "../data/products.js";
// import {loadCart} from "../data/cart.js";

Promise.all([
    loadProductsFetch
]).then(() => {
    renderPaymentSummary();
})
renderCartSummary();
/*
loadProducts(() => {
    renderOrderSummary();

    renderPaymentSummary();
});
*/
