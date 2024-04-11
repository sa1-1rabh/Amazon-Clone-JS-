import {cart, deleteFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';

export function renderCartSummary(){

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
      
      const productId = cartItem.productId;

      let matchingItem;
      products.forEach((product) => {
          if(productId === product.id){
              matchingItem = product;
          }
      });
      
      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption;
      deliveryOptions.forEach( (Option) => {
        if(deliveryOptionId === Option.id){
          deliveryOption = Option;
        }
      } );
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');


      cartSummaryHTML += `
          <div class="cart-item-container 
              js-cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    $${(matchingItem.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingItem.id}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingItem,cartItem)}
                </div>
              </div>
            </div>
      `;
  })

  function deliveryOptionsHTML(matchingItem,cartItem){
    let deliveryHTML = '';
    deliveryOptions.forEach( (deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${((deliveryOption.priceCents)/100).toFixed(2)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHTML += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingItem.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    } );
    return deliveryHTML;
  }

  // console.log(cartSummaryHTML);

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
      .forEach( (deleteLink) => {
          deleteLink.addEventListener('click', () => {
              const productId = deleteLink.dataset.productId;
              
              deleteFromCart(productId);
              
              let toDelete = document.querySelector(`.js-cart-item-container-${productId}`);
              toDelete.remove();
          } );
      } );
    
    document.querySelectorAll('.js-delivery-option')
      .forEach( (deliveryOption) => {
        deliveryOption.addEventListener('click',() => {
          const {productId,deliveryOptionId} = deliveryOption.dataset;
          updateDeliveryOption(productId,deliveryOptionId);
          renderCartSummary();
        });
      } );
  
}