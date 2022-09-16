window.onload = () => {
    const cards = document.querySelectorAll('.card');
    const sc = document.getElementById("score")
    const restar=document.getElementById("restart")
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
    const checkForMatch = () => {
        let isMatch = firstCard.dataset.name == secondCard.dataset.name;
        if(isMatch){
            disableCards()
        }
        else{
         unflipCards();
        }
    }
    const disableCards = () => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        score = score + 1
        sc.innerText = score
    }
    const unflipCards = () => {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipcard');
            secondCard.classList.remove('flipcard');
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }, 800);
    }
    for(card of cards) card.addEventListener('click', flipCard);
}