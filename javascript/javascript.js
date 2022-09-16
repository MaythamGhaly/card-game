window.onload = () => {
    const cards = document.querySelectorAll('.card');
    const sc = document.getElementById("score")
    const restar=document.getElementById("restart")
    let score = 0
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    
    
    // function to shuffle the cardes according to the order
    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 6);
            card.style.order = randomPos;
        });
    })();
    // function to flip the card 
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flipcard');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;
        checkForMatch();
    }
    function checkForMatch() {
        let isMatch = firstCard.dataset.name == secondCard.dataset.name;
        if(isMatch){
            disableCards()
        }
        else{
         unflipCards();
        }
    }
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        score = score + 1
        sc.innerText = score
    }
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipcard');
            secondCard.classList.remove('flipcard');
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }, 800);
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
}