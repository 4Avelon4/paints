import '@/style/style.scss';
import Swiper, { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import { render, getSortDataset, getFilterData, clearBasket } from './addElement';

render();

(() => {
  document.addEventListener('DOMContentLoaded', function () {
    // clearBasket
    const $basketClear = document.querySelector('.basket__clear');

    $basketClear.addEventListener('click', () => {
      clearBasket();
    });

    // filter
    const $checkInput = document.querySelectorAll('.check__input');

    $checkInput.forEach((item) => {
      item.addEventListener('change', function (event) {
        const $filterClass = event.target.closest('.filter-menu__check');

        if (!$filterClass.classList.contains('filter--active')) {
          $filterClass.classList.add('filter--active');
        } else {
          $filterClass.classList.remove('filter--active');
        }

        getFilterData();
      });
    });

    // select
    const $selectHeader = document.querySelector('.select__header');
    const $selectBody = document.querySelector('.select__body');
    const $selectItem = document.querySelectorAll('.select__item');
    const $popap = document.querySelector('.catalog__popap');

    $selectItem.forEach((item) => {
      item.addEventListener('click', function (event) {
        const sort = event.currentTarget.dataset.sort;
        const content = event.target.textContent;

        getSortDataset(sort, content);

        $selectBody.classList.remove('select--active');
        $popap.classList.remove('select--active');
      });
    });
    $selectHeader.addEventListener('click', () => {
      $selectBody.classList.add('select--active');
      $popap.classList.add('select--active');
    });

    // toggle
    const $toggleBtn = document.querySelector('.toggle__btn');
    const $menu = document.querySelector('.menu');

    $toggleBtn.addEventListener('click', navToggleClick);

    function navToggleClick() {
      $menu.classList.toggle('open');
      $toggleBtn.classList.toggle('toggle__btn--open');
      document.body.classList.toggle('stop--scroll');
    }

    // basket
    const $basketBtnActivate = document.querySelector('.control-panel__item--basket');
    const $basketBtnDeactivate = document.querySelector('.basket__button-deactivate');
    const $basket = document.querySelector('.basket');

    $basketBtnActivate.addEventListener('click', activeBasketClick);
    $basketBtnDeactivate.addEventListener('click', deactiveBasketClick);

    function activeBasketClick() {
      $basket.classList.add('basket-open');
      $popap.classList.add('select--active');
    }

    function deactiveBasketClick() {
      $basket.classList.remove('basket-open');
      $popap.classList.remove('select--active');
    }

    // filters
    const $filterBtnActivate = document.querySelector('.fiter__button-active');
    const $filterBtnDeactivate = document.querySelector('.filter-menu__button-deactive');
    const $filterMenu = document.querySelector('.filter-menu');

    $filterBtnActivate.addEventListener('click', activeFilterClick);
    $filterBtnDeactivate.addEventListener('click', deactiveFilterClick);

    function activeFilterClick() {
      $filterMenu.classList.add('filter-open');
      document.body.classList.add('stop--scroll');
      $popap.classList.add('select--active');
    }

    function deactiveFilterClick() {
      $filterMenu.classList.remove('filter-open');
      document.body.classList.remove('stop--scroll');
      $popap.classList.remove('select--active');
    }
  });
})();

// swiper
const swiper = new Swiper('.swiper-container', {
  modules: [Navigation, Pagination, Autoplay, A11y],

  centeredSlides: true,

  slidesPerView: 1,
  loop: true,

  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    paginationBulletMessage: 'Выбрать слайд {{index}}',
  },
});
