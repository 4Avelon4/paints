import { Product, createElementInCatalog, createElementInBasket } from './elements';
import { calculateFinalBasketPrice, getCounterProduct } from './getSupportingFunction';

const products = [
  new Product(
    'el1',
    './img/catalog__product/prew1.jpg',
    278,
    'Краска Wallquest, Brownsone MS90102',
    14800,
    'available'
  ),
  new Product(
    'el2',
    './img/catalog__product/prew2.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    4800,
    'available contract'
  ),
  new Product(
    'el3',
    './img/catalog__product/prew3.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    3800,
    'new available sale'
  ),
  new Product(
    'el4',
    './img/catalog__product/prew4.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    2800,
    'available sale'
  ),
  new Product(
    'el5',
    './img/catalog__product/prew5.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    4800,
    'available sale'
  ),
  new Product('el6', './img/catalog__product/prew6.jpg', 200, 'Краска Wallquest, Brownsone MS90102', 8800, 'contract'),
  new Product('el7', './img/catalog__product/prew7.jpg', 200, 'Краска Wallquest, Brownsone MS90102', 7800, 'available'),
  new Product(
    'el8',
    './img/catalog__product/prew8.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    4800,
    'available new contract'
  ),
  new Product(
    'el9',
    './img/catalog__product/prew9.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    10800,
    'exclusive'
  ),
  new Product(
    'el10',
    './img/catalog__product/prew2.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    12800,
    'new sale'
  ),
  new Product(
    'el11',
    './img/catalog__product/prew3.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    5800,
    'available'
  ),
  new Product('el12', './img/catalog__product/prew4.jpg', 200, 'Краска Wallquest, Brownsone MS90102', 5800, 'sale'),
  new Product(
    'el13',
    './img/catalog__product/prew5.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    11800,
    'exclusive'
  ),
  new Product(
    'el14',
    './img/catalog__product/prew6.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    5800,
    'new contract'
  ),
  new Product(
    'el15',
    './img/catalog__product/prew7.jpg',
    200,
    'Краска Wallquest, Brownsone MS90102',
    5800,
    'available'
  ),
];

const $basketListDOM = document.getElementById('basket__list');
const basketArrayProducts = [];
const basketItemArray = [];

// Очистить козину
export function clearBasket() {
  while ($basketListDOM.lastChild) {
    $basketListDOM.removeChild($basketListDOM.lastChild);
  }

  basketArrayProducts.splice(0, basketArrayProducts.length);
  basketItemArray.splice(0, basketItemArray.length);

  calculateFinalBasketPrice(basketItemArray);
}

// Добавить элемент в корзину
export function getElementInBasket(item) {
  const productsCopy = [...products];

  for (const itemArray of productsCopy) {
    const idItem = item.getAttribute('id');

    if (itemArray.id === idItem) {
      if (!basketArrayProducts.includes(itemArray)) {
        const newElement = createElementInBasket(itemArray);

        basketArrayProducts.push(itemArray);
        $basketListDOM.append(newElement);

        setUpNewItem(newElement, idItem, itemArray.price);

        return;
      }

      changeBasketItem(idItem);
    }
  }
}

// Настроить новый элемент корзины
function setUpNewItem(item, idItem, price) {
  const itemObj = {
    id: idItem,
    elementItem: item,
    counter: 1,
    price,
    active: true,
  };

  basketItemArray.push(itemObj);
  calculateFinalBasketPrice(basketItemArray);

  const $basketRemoveBtn = item.querySelector('.basket-item__button-remove');
  const $basketAmount = item.querySelector('.basket-item__amount');
  const $basketAddBtn = item.querySelector('.basket-item__button-add');
  const $basketToggleBtn = item.querySelector('.basket-item__button-toggle');

  $basketRemoveBtn.addEventListener('click', () => {
    if (itemObj.counter === 1) {
      return;
    }

    itemObj.counter--;
    $basketAmount.textContent = itemObj.counter;

    calculateFinalBasketPrice(basketItemArray);
  });

  $basketAddBtn.addEventListener('click', () => {
    itemObj.counter++;
    $basketAmount.textContent = itemObj.counter;

    calculateFinalBasketPrice(basketItemArray);
  });

  const $basketImg = item.querySelector('.basket-item__img');
  const $basketContent = item.querySelector('.basket-item__content');

  $basketToggleBtn.addEventListener('click', () => {
    if (!$basketToggleBtn.classList.contains('basket-item__button-toggle--active')) {
      $basketToggleBtn.classList.add('basket-item__button-toggle--active');
      $basketImg.classList.add('opacity-40');
      $basketContent.classList.add('opacity-20');
      $basketRemoveBtn.classList.add('opacity-20');
      $basketAmount.classList.add('opacity-20');
      $basketAddBtn.classList.add('opacity-20');

      itemObj.active = false;

      calculateFinalBasketPrice(basketItemArray);

      return;
    }

    $basketToggleBtn.classList.remove('basket-item__button-toggle--active');
    $basketImg.classList.remove('opacity-40');
    $basketContent.classList.remove('opacity-20');
    $basketRemoveBtn.classList.remove('opacity-20');
    $basketAmount.classList.remove('opacity-20');
    $basketAddBtn.classList.remove('opacity-20');

    itemObj.active = true;

    calculateFinalBasketPrice(basketItemArray);
  });
}

// Добавить элемент уже имеющийся в корзине
function changeBasketItem(idItem) {
  for (const basketItem of basketItemArray) {
    if (basketItem.id === idItem) {
      basketItem.counter++;

      const $basketAmount = basketItem.elementItem.querySelector('.basket-item__amount');

      $basketAmount.textContent = basketItem.counter;

      calculateFinalBasketPrice(basketItemArray);
    }
  }
}

// Отфильтровать каталог тотваров
export function getFilterData() {
  const $filterOptions = document.querySelectorAll('.filter--active');
  const $counterDOM = document.getElementById('counter');
  let counter = null;
  const optionsArray = [];

  for (const filterEl of $filterOptions) {
    optionsArray.push(filterEl.dataset.filter);
  }

  const $catalogItem = document.querySelectorAll('.catalog__item');

  $catalogItem.forEach((elem) => {
    elem.classList.remove('hide');

    for (const arrayItem of optionsArray) {
      if (!elem.classList.contains(arrayItem)) {
        elem.classList.add('hide');
      }
    }
  });

  for (const item of $catalogItem) {
    if (!item.classList.contains('hide')) {
      counter += 1;
    }
  }

  if (counter) {
    $counterDOM.textContent = `${counter} ${getCounterProduct(counter)}`;
  } else {
    $counterDOM.textContent = `Товары отсутствуют`;
  }
}

const $catalog = document.getElementById('catalog__list');

let [column, columnDir] = ['price', false];

// Сортировка каталога товаров по цене
export function getSortDataset(sort, content) {
  const $selectCurrent = document.querySelector('.select__current');

  if (sort === 'price-exp') {
    column = 'price';
    columnDir = false;

    $selectCurrent.textContent = content;
    render();
  }

  if (sort === 'price-unexp') {
    column = 'price';
    columnDir = true;

    $selectCurrent.textContent = content;
    render();
  }
}

// Получить сортировку массива по параметрам
function getSortProducts(prop, dir) {
  const productsCopy = [...products];

  return productsCopy.sort((productsA, productsB) => {
    const dirIf = dir === false ? productsA[prop] < productsB[prop] : productsA[prop] > productsB[prop];

    if (!dirIf) {
      return -1;
    }

    return 1;
  });
}

// Отрисовать
export function render() {
  let productsCopy = [...products];

  productsCopy = getSortProducts(column, columnDir);

  while ($catalog.lastChild) {
    $catalog.removeChild($catalog.lastChild);
  }

  for (const product of productsCopy) {
    $catalog.append(createElementInCatalog(product));
  }

  const $catalogBtn = document.querySelectorAll('.catalog-item__button');

  $catalogBtn.forEach((item) => {
    item.addEventListener('click', function (event) {
      getElementInBasket(event.target.closest('.catalog__item'));
    });
  });

  getFilterData();
}
