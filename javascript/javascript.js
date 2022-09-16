window.onload = () => {
    const cards = document.querySelectorAll('.card');
    const sc = document.getElementById("score")
    let score = 0
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    cards.forEach(card => card.addEventListener('click', flipCard));
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
    
    
    
}