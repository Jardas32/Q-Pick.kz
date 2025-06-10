const favoritStorege = JSON.parse(localStorage.getItem('favorits')) || [];
const cartStorege = JSON.parse(localStorage.getItem('card')) || [];
const naushniky = document.querySelector('.naushniky');
const interesCount = document.querySelector('.interesCount');
document.querySelector('.countCart').textContent = cartStorege.length;

function renderFavorits() {
if(favoritStorege.length <= 0) {
    document.querySelector('.textfavorites').textContent = 'Пусто';
}
    interesCount.textContent = favoritStorege.length;
    naushniky.innerHTML = ``;
     if(favoritStorege) {
        favoritStorege.forEach((item, index) => {
            let {id, imgHard, img, imgStart, title, prices} = item;
            let newcard = document.createElement('div');
            newcard.setAttribute('class', 'card');
            newcard.setAttribute('id', id);
            newcard.innerHTML = `
            <img class="hartcard" data-index="${index}" src="img/blackHard.png" alt="">
            <img class="imgnaushniky" src="${img}">
            <div class="center">
                <p class="pcenter"><span class="title">${title}</span><span class="price">${prices}</span></p>
                <p><img class="imgStart" src="${imgStart}" alt="imgstart"></p>
                <button data-card="${index}" class="btadd">
                    <img class="imgCart" src="img/carts.png" alt="">
               </button>
            </div>
            `;

            naushniky.append(newcard);

        })
     }
};

                    //Удаление товаров с корзины

naushniky.addEventListener('click', (e) => {
    const cartPosition = e.target.getAttribute('data-index');
    if(e.target.classList.contains('hartcard') || cartPosition !== null) {
        favoritStorege.splice(cartPosition, 1);
    }

    localStorage.setItem('favorits', JSON.stringify(favoritStorege));
    renderFavorits();
    
});


renderFavorits();


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btadd') || 
       e.target.classList.contains('imgCart')) {
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
       console.log(card);
       if (existCard !== -1) {
           alert('Такой товар уже добавлен!');
       } else {
           card.push(cartItem);
           localStorage.setItem('card', JSON.stringify(card));
           document.querySelector('.countCart').textContent = card.length;
       }

    }
    
});

