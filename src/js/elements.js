class Product {
  constructor(id, img, imageSize, descr, price, filterClass) {
    this.id = id;
    this.img = img;
    this.imageSize = imageSize;
    this.descr = descr;
    this.price = price;
    this.filterClass = filterClass;
  }

  get Id() {
    return this.id;
  }
}

function createElementInCatalog(item) {
  const $el = document.createElement('li');
  const $topWrapper = document.createElement('div');
  const $prev = document.createElement('div');
  const $img = document.createElement('img');
  const $descr = document.createElement('p');
  const $info = document.createElement('div');
  const $price = document.createElement('span');
  const $button = document.createElement('button');

  $el.className = `catalog__item catalog-item ${item.filterClass}`;
  $topWrapper.classList.add('catalog-item__top-wrapper');
  $prev.classList.add('catalog-item__prev');
  $img.classList.add('catalog-item__img');
  $descr.classList.add('catalog-item__descr');
  $info.classList.add('catalog-item__info');
  $price.classList.add('catalog-item__price');
  $button.classList.add('catalog-item__button');

  if (item.imageSize === 200) {
    $img.classList.add('catalog-item__img--200');
  }

  $img.src = item.img;
  $img.alt = 'Картинка товара';
  $descr.textContent = item.descr;
  $price.textContent = `${item.price} ₽`;

  $el.setAttribute('id', `${item.id}`);

  $info.append($price, $button);
  $prev.append($img);
  $topWrapper.append($prev, $descr);
  $el.append($topWrapper, $info);

  return $el;
}

function createElementInBasket(item) {
  const $el = document.createElement('li');
  const $info = document.createElement('div');
  const $img = document.createElement('img');
  const $content = document.createElement('div');
  const $descr = document.createElement('p');
  const $price = document.createElement('span');
  const $control = document.createElement('div');
  const $leftWrapper = document.createElement('div');
  const $buttonAdd = document.createElement('button');
  const $amount = document.createElement('div');
  const $buttonRemove = document.createElement('button');
  const $buttonToggle = document.createElement('button');

  $el.classList.add('basket__item', 'basket-item');
  $info.classList.add('basket-item__info');
  $img.classList.add('basket-item__img');
  $content.classList.add('basket-item__content');
  $descr.classList.add('basket-item__descr');
  $price.classList.add('basket-item__price');
  $control.classList.add('basket-item__control');
  $leftWrapper.classList.add('basket-item__left-wrapper');
  $buttonRemove.classList.add('basket-item__button-remove');
  $amount.classList.add('basket-item__amount');
  $buttonAdd.classList.add('basket-item__button-add');
  $buttonToggle.classList.add('basket-item__button-toggle');

  $img.src = item.img;
  $img.alt = 'Картинка товара';
  $descr.textContent = item.descr;
  $price.textContent = `${item.price} ₽`;
  $amount.textContent = '1';

  $el.setAttribute('id', `${item.id}`);

  $content.append($descr, $price);
  $info.append($img, $content);
  $control.append($buttonRemove, $amount, $buttonAdd);
  $leftWrapper.append($control, $buttonToggle);
  $el.append($info, $leftWrapper);

  return $el;
}

export { Product, createElementInCatalog, createElementInBasket };
