const cartStorege = JSON.parse(localStorage.getItem('card')) || [];
const cardHard = document.querySelector('.card');
const favoritStorege = JSON.parse(localStorage.getItem('favorits')) || [];
const interesCount = document.querySelector('.interesCount');
const hartcard = document.querySelector('.hartcard');
const container = document.querySelector('.container');
document.querySelector('.countCart').textContent = cartStorege.length;
document.querySelector('.interesCount').textContent = favoritStorege.length;

document.querySelectorAll('.card').forEach(card => {
    const id = card.id;
    const favorits = JSON.parse(localStorage.getItem('favorits') || '[]');
    const itsCard = JSON.parse(localStorage.getItem('card') || '[]');
    const itsCards = itsCard.some(item => item.id === id);

    if(itsCards) {
        const btaddBlack = card.querySelector('.btadd');
        if(btaddBlack) {
            btaddBlack.classList.add('btaddclass');
        }
    }

    const isFavorit = favorits.some(item => item.id === id);

    if (isFavorit) {
        const heartIcon = card.querySelector('.hartcard');
        if (heartIcon) {
            heartIcon.src = 'img/blackHard.png';
        }
    }
});


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btadd') || e.target.classList.contains('imgCart')) {
        let cardElement = e.target.closest('.card');
        let id = cardElement.id;
        let imgHard = cardElement.querySelector('.hartcard').src;
        let img = cardElement.querySelector('.imgnaushniky').src;
        let imgStart = cardElement.querySelector('.imgStart').src;
        let title = cardElement.querySelector('.title').textContent;
        let prices = cardElement.querySelector('.price').textContent;
        let price = parseInt(prices.replace(/\s/g, ''), 10);

        let cartItem = { id, imgHard, img, title, price, imgStart, quantity: 1 };

        let card = JSON.parse(localStorage.getItem('card') || '[]');
        const existCard = card.findIndex((item) => item.id === id);

        if (existCard !== -1) {
            alert('Такой товар уже добавлен!');
        } else {
            card.push(cartItem);
            localStorage.setItem('card', JSON.stringify(card));
            document.querySelector('.countCart').textContent = card.length;
            location.reload();
        }
    }

    else if (e.target.classList.contains('hartcard')) {
        let cardElement = e.target.closest('.card');
        let id = cardElement.id;
        let imgHard = cardElement.querySelector('.hartcard').src;
        let img = cardElement.querySelector('.imgnaushniky').src;
        let imgStart = cardElement.querySelector('.imgStart').src;
        let title = cardElement.querySelector('.title').textContent;
        let prices = cardElement.querySelector('.price').textContent;
        let favoritItem = { id, imgHard, img, imgStart, title, prices };

        let favorits = JSON.parse(localStorage.getItem('favorits') || '[]');
        const existFavorits = favorits.findIndex((item) => item.id === id);

        if (existFavorits !== -1) {
            favorits.splice(existFavorits, 1);
        } else {
            favorits.push(favoritItem);
            cardElement.querySelector('.hartcard').src = 'img/blackHard.png';
            document.querySelector('.interesCount').textContent = favorits.length;
        }
        if(cardElement.querySelector('.hartcard').src = 'img/blackHard.png') {
            cardElement.querySelector('.hartcard').src = 'img/hardscard.png';
        }

        localStorage.setItem('favorits', JSON.stringify(favorits));
        location.reload();
    }
    else if(e.target.classList.contains('imgnaushniky')) {
          let card = e.target.closest('.card');
          let img = card.querySelector('.imgnaushniky').src;
          let title = card.querySelector('.title').textContent;
          let price = card.querySelector('.price').textContent;

          const imgPopup = document.querySelector('.imgPopup');
          const titlePopup = document.querySelector('.titlePopup');
          const pricePopup = document.querySelector('.pricePopup');

          imgPopup.src = img;
          titlePopup.textContent = title;
          pricePopup.textContent = price;

        document.querySelector('.bgpopup').classList.add('bgpopupclass');
        document.querySelector('html').classList.add('noscroll');

    }

});

document.querySelector('.closedPopup').addEventListener('click', () => {
    document.querySelector('.bgpopup').classList.remove('bgpopupclass');
    document.querySelector('html').classList.remove('noscroll');

});


const btGotop = document.querySelector('.btGotop');

btGotop.addEventListener('click', goTop);
window.addEventListener('scroll', track);

function track() {
    const offset = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if(offset > coords) {
        btGotop.classList.add('btGotopclass');
    }
    else {
        btGotop.classList.remove('btGotopclass');
    }
}

function goTop() {
    if(window.pageYOffset > 0) {
        window.scrollBy(0, -75);
        setTimeout(goTop, 0);
    }
};
