window.onload = () => {
    const cards = document.querySelectorAll('.card');
    const sc = document.getElementById("score")
    const restart = document.getElementById("restart")
    let score = 0
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;



    // function to shuffle the cardes according to the order
    const shuffle = () => {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 6);
            card.style.order = randomPos;
        });
    };
    shuffle();
    // function to flip the card 
    const flipCard = (e) => {
        if (lockBoard) return;
        if (e.currentTarget === firstCard) return;
        e.currentTarget.classList.add('flipcard');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = e.currentTarget;
            return;
        }
        secondCard = e.currentTarget;
        checkForMatch();
    }
    // function to check if we have a matching cards
    const checkForMatch = () => {
        let isMatch = firstCard.dataset.name == secondCard.dataset.name;
        if (isMatch) {
            disableCards()
        }
        else {
            unflipCards();
        }
    }
    // function to increase the score and keep the cards open if they're matching
    const disableCards = () => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        score = score + 1
        sc.innerText = score
    }
    // function to reclose the cards if they're not matching
    const unflipCards = () => {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipcard');
            secondCard.classList.remove('flipcard');
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }, 800);
    }
    // function to restart the game
    const Restart = () => {
        for (card of cards) card.classList.remove('flipcard');
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        score = 0
        sc.innerText = score
        shuffle()
        for (card of cards) card.addEventListener('click', flipCard);
    }
    for (card of cards) card.addEventListener('click', flipCard);
    restart.addEventListener("click", Restart)
}