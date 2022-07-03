const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
  );

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');
  
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;
  
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
  }
  
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
      'title__item_shopping_car'
    );
    
    for (let i = 0; i < elementsTitle.length; i++) {
      if (elementsTitle[i].innerText === itemTitle) {
        let elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector(
          '.shoppingCartItemQuantity'
        );

        console.log(elementQuantity);
        elementQuantity.value++;
        
        updateShoppingCartTotal();
        return;
      }
    }
  
    const shoppingCartRow = document.createElement('tr');
    const shoppingCartContent = `
            <td class="shopping-cart_onecolumn">
                  <img src=${itemImage} class="shopping-cart-image">
                  <h6 class="title__item_shopping_car">${itemTitle}</h6>
            </td>
            <td class="shoppingCartItemPrice ">
            ${itemPrice}
            </td>
            <td>
            <input class="shoppingCartItemQuantity" type="number"
            value="1">
            </td>
            <td>
            <button class="buttonDelete" type="button">X</button>
            </td>

      `;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartRow.classList.add('shoppingCartItem');
    shoppingCartItemsContainer.append(shoppingCartRow);
  
    shoppingCartRow
      .querySelector('.buttonDelete')
      .addEventListener('click', removeShoppingCartItem);
  
    shoppingCartRow
      .querySelector('.shoppingCartItemQuantity')
      .addEventListener('change', quantityChanged);
  
    updateShoppingCartTotal();
  }
  
function updateShoppingCartTotal() {
    let total = 0;

    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
        '.shoppingCartItemPrice'
      );
      const shoppingCartItemPrice = Number(
        shoppingCartItemPriceElement.textContent.replace('$', '')
      );
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
        '.shoppingCartItemQuantity'
      );
      const shoppingCartItemQuantity = Number(
        shoppingCartItemQuantityElement.value
      );
      total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    
    shoppingCartTotal.innerHTML = `${total.toFixed(0)}$ clp`;
  }
  
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
  }
  
function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
  }
  
function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
  }