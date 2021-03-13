const headerBurger = document.querySelector('.header__burger');
const burgerItem = document.querySelector('.header__burger-item');
const menuContent = document.querySelector('.menu-content');
//клик по кнопке для скрытия/показа фильтра и изменения иконки
headerBurger.onclick = function () {
    burgerItem.classList.toggle('header__burger-active');
    menuContent.classList.toggle('menu-content_active');
};
//==================================


// для перемещения блоков в любую часть страницы
"use strict";

function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();
//=====================================

// Инициализируем  Swiper
new Swiper('.swiper-container', {

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 2,
    spaceBetween: 30,
    autoHeight: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        767: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        }
    },
});
//==============================

// ===========табы===============================

// выбор пункта меню со сменой контента для каждого путкта.
let wrapContent = document.querySelector('.wrap-content')
let menuContentListItem = wrapContent.querySelectorAll('.menu-content__list-item')
let contentMenu = wrapContent.querySelectorAll('.content-menu')

function change(arr, i) {
    arr.forEach(item => {
        item.forEach(i => { i.classList.remove('is-active') })
        item[i].classList.add('is-active')
    })
}

for (let i = 0; i < menuContentListItem.length; i++) {
    menuContentListItem[i].addEventListener('click', () => {
        change([menuContentListItem, contentMenu], i)
    })
}
//=================================



//=== модальное окно для reviews-btn "задать свой вопрос"

//находим нужные элементы:кнопка модалки,модалка,кнопка закрытия
const modalBtn = document.querySelector('#modal-btn');
const modalBtn2 = document.querySelector('#modal-btn2');
const modal = document.querySelector('#modal');
const modalClose = document.querySelector('#modal-close');


// прослушиваем клик по кнопке Открытия , и открываем модалку
modalBtn.addEventListener('click', function () {
    modal.classList.remove('modal-hidden');

});
modalBtn2.addEventListener('click', function () {
    modal.classList.remove('modal-hidden');

});

// прослушиваем клик по кнопке Закрытия , и закрываем модалку
modalClose.addEventListener('click', function () {
    modal.classList.add('modal-hidden');
});
//прослушиваем клик по всему фейду вокруг модального окна
modal.addEventListener('click', function () {
    modal.classList.add('modal-hidden');
});
//запрещаем отслеживание клика по модальному окну а только вокруг него для того чтоб не закрывалось все при вводе данных в форму модального окна
modal.querySelector('.modal-ask__form').addEventListener('click', function (e) {
    e.stopPropagation();
});
//=============================================