export const cart = [];

export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.id){
            matchingItem = cartItem;
        }
    });
    if(matchingItem){
        matchingItem.quantity += 1;
    }
    else{
        cart.push({
            id: productId,
            quantity: 1
        });
    }
}

