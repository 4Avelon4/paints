// Вернуть итоговую цену товара
function calculateFinalBasketPrice(basketItemArray) {
  const $basketPrice = document.querySelector('.basket__descr');
  const $basketCounter = document.querySelector('.basket__all-amount');
  const $controlPanelBasket = document.querySelector('.control-panel__item--basket-descr');
  let basketPriceInfo = 0;
  let counter = 0;

  for (const basketItem of basketItemArray) {
    if (basketItem.active) {
      const itemPrice = basketItem.counter * basketItem.price;

      counter += basketItem.counter;
      basketPriceInfo += itemPrice;
      $basketPrice.textContent = `${basketPriceInfo.toLocaleString('ru')}₽`;
      $basketCounter.textContent = `${counter} ${getCounterProduct(counter)}`;

      if (counter <= 9) {
        $controlPanelBasket.style.left = '8px';
      } else if (counter > 9 && counter < 20) {
        $controlPanelBasket.style.left = '5px';
      } else if (counter > 19) {
        $controlPanelBasket.style.left = '4px';
      }

      $controlPanelBasket.textContent = counter;
    }

    $basketPrice.textContent = `${basketPriceInfo.toLocaleString('ru')}₽`;
    $basketCounter.textContent = `${counter} ${getCounterProduct(counter)}`;
    $controlPanelBasket.textContent = counter;
  }

  if (basketItemArray.length === 0) {
    $basketPrice.textContent = `${basketPriceInfo.toLocaleString('ru')}₽`;
    $basketCounter.textContent = `Товары отсутствуют`;
    $controlPanelBasket.textContent = counter;
    $controlPanelBasket.style.left = '8px';
  }
}

// Настроить склонение вывода товаров
function getCounterProduct(counter) {
  if (counter % 10 === 1) {
    return 'товар';
  }

  if ([2, 3, 4].includes(counter % 10)) {
    return 'товара';
  }

  if ([11, 12, 13, 14].includes(counter)) {
    return 'товара';
  }

  return 'товаров';
}

export { getCounterProduct, calculateFinalBasketPrice };
