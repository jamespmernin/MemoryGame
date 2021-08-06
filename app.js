document.addEventListener('DOMContentLoaded', () => {
    const DELAY = 500;
    //card options
    const cardArray = [
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ]
    cardArray.sort(() => 0.5 - Math.random());
    //create game board
    const grid = document.querySelector('.grid')
    let resultDisplay = document.querySelector('#result');
    let statusDisplay = document.querySelector('#status');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    resultDisplay.textContent = cardsWon.length;
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card);
        }
    }

    //check for match
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            statusDisplay.textContent = 'You have clicked the same image!';
            setTimeout(clearStatus, DELAY * 2);
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
            if (cardsWon.length !== cardArray.length / 2) {
                statusDisplay.textContent = 'You found a match!';
                setTimeout(clearStatus, DELAY * 2);
            }
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            statusDisplay.textContent = 'Sorry, try again!';
            setTimeout(clearStatus, DELAY * 2);
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            statusDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    //flip card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, DELAY);
        }
    }

    function clearStatus() {
        statusDisplay.textContent = '';
    }

    createBoard();
})