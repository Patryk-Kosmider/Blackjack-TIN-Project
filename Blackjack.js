const dealerTable = document.querySelector(".dealer");
const playerTable = document.querySelector(".player");
const playBtn = document.querySelectorAll(".playBtn");
const endGame = document.querySelector(".endGame");
const playerTokens = document.querySelector(".playerTokens"); 
const BetInput = document.querySelector(".bet");
const TokenStatus = localStorage.getItem("tokens");
const labelBet = document.querySelector(".labelBet");
const betPanel = document.querySelector(".betPanel");
let BetStatus = false;
let currentBet = 0;
let doubleDown = false;
let pPoints = 0;
const HitBtn = playBtn[0];
const StandBtn = playBtn[1];
const ResetBtn = playBtn[2];
const BetBtn = playBtn[4];
const noBetBtn = playBtn[5];
const DoubleBtn = playBtn[3];
let StandStatus = false;


// Card deck

const cardDeck = [
    "2_of_clubs",
    "2_of_diamonds",
    "2_of_hearts",
    "2_of_spades",
    "3_of_clubs",
    "3_of_diamonds",
    "3_of_hearts",
    "3_of_spades",
    "4_of_clubs",
    "4_of_diamonds",
    "4_of_hearts",
    "4_of_spades",
    "5_of_clubs",
    "5_of_diamonds",
    "5_of_hearts",
    "5_of_spades",
    "6_of_clubs",
    "6_of_diamonds",
    "6_of_hearts",
    "6_of_spades",
    "7_of_clubs",
    "7_of_diamonds",
    "7_of_hearts",
    "7_of_spades",
    "8_of_clubs",
    "8_of_diamonds",
    "8_of_hearts",
    "8_of_spades",
    "9_of_clubs",
    "9_of_diamonds",
    "9_of_hearts",
    "9_of_spades",
    "10_of_clubs",
    "10_of_diamonds",
    "10_of_hearts",
    "10_of_spades",
    "ace_of_clubs",
    "ace_of_diamonds",
    "ace_of_hearts",
    "ace_of_spades",
    "jack_of_clubs",
    "jack_of_diamonds",
    "jack_of_hearts",
    "jack_of_spades",
    "king_of_clubs",
    "king_of_diamonds",
    "king_of_hearts",
    "king_of_spades",
    "queen_of_clubs",
    "queen_of_diamonds",
    "queen_of_hearts",
    "queen_of_spades"
];


// start Button

const start = document.querySelector(".startBtn");


// Start game 
start.addEventListener("click", ()=>{

    if(!localStorage.getItem("tokens")){
    localStorage.setItem("tokens", 100);
}
    playerTokens.innerHTML = "Tokens: " + localStorage.getItem("tokens");
    start.style.display = "none";
    ResetBtn.style.visibility = "visible";
    ResetBtn.disabled = true;
    HitBtn.disabled = true;
    StandBtn.disabled = true;
    BetBtn.style.visibility = "visible";
    BetInput.style.visibility = "visible";
    DoubleBtn.style.visibility = "visible";
    noBetBtn.style.visibility = "visible";
    ResetBtn.style.visibility = "hidden";
    DoubleBtn.style.visibility = "hidden";
    playerTokens.style.visibility = "visible";
    labelBet.style.visibility = "visible";
    

})

// Bet triggers ( Bet click, Double down, No bet)


noBetBtn.addEventListener("click", () => {
    BetBtn.disabled = true;
    DoubleBtn.disabled = true;
    HitBtn.disabled = false;
    StandBtn.disabled = false;
    ResetBtn.style.visibility = "visible";
    DoubleBtn.style.visibility = "visible";
    BetInput.style.visibility = "hidden";
    noBetBtn.style.visibility = "hidden";
    BetBtn.style.visibility = "hidden";
    betPanel.style.display = "block";
    BetStatus = true;
    labelBet.innerHTML = "Bet tokens: No bet";
    playerTokens.style.height = "auto";
    betPanel.style.display = "-webkit-box";
    
    const marginLeftValue = window.innerWidth < 1000 ? "15%" : "32.5%";
    betPanel.style.marginLeft = marginLeftValue;

    HandStartDealer();
    HandStartPlayer();
    HandStartPlayer();
    CountPoints();

})

BetBtn.addEventListener("click", ()=>{
    if(BetInput.value != ""){
        const currentBet = parseInt(BetInput.value);
        console.log(currentBet);
        const newTokens = parseInt(localStorage.getItem("tokens"));
        if (newTokens - currentBet >= 0){
        currenTokens = newTokens - currentBet;
        localStorage.setItem("tokens", currenTokens);
        playerTokens.innerHTML = "Tokens: " + parseInt(localStorage.getItem("tokens"));
        BetBtn.disabled = true;
        DoubleBtn.disabled = false;
        HitBtn.disabled = false;
        StandBtn.disabled = false;
        ResetBtn.style.visibility = "visible";
        DoubleBtn.style.visibility = "visible";
        BetInput.style.visibility = "hidden";
        noBetBtn.style.visibility = "hidden";
        BetBtn.style.visibility = "hidden";
        labelBet.innerHTML = "Bet Tokens: " + BetInput.value;
        betPanel.style.display = "block";
        betPanel.style.display = "-webkit-box";
        const marginLeftValue = window.innerWidth < 1500 ? "15%" : "45%";
        betPanel.style.marginLeft = marginLeftValue;
        HandStartDealer();
        HandStartPlayer();
        HandStartPlayer();
        CountPoints();
        } else {
            alert("No tokens");
        }
    } 
 })

 DoubleBtn.addEventListener("click", () =>{
    const currentBet = parseInt(BetInput.value);
    const newTokens = parseInt(localStorage.getItem("tokens"));
    currenTokens = newTokens - currentBet;
    localStorage.setItem("tokens", currenTokens);
    playerTokens.innerHTML = "Tokens: " + parseInt(localStorage.getItem("tokens"));
    doubleDown = true;
    Hit();
    if(pPoints < 21) {
    ChangeBlankCard();
    CheckBetWin(doubleDown);
    } else {
        ResetBtn.disabled = false;
        DoubleBtn.disabled = true;
        HitBtn.setAttribute("disabled", true);
        StandBtn.setAttribute("disabled",true);
    }
 })


// First round only - dealer Hand

function HandStartDealer(){
    let random = Math.floor((Math.random() * cardDeck.length - 1) + 1);
    let card = document.createElement("img");
    let blank = document.createElement("img");
    console.log(cardDeck[random]);
    console.log(random);
    card.setAttribute("src",  "./cards/" +cardDeck[random].toString() + ".png")
    card.setAttribute("class", "cardDealer");
    blank.setAttribute("src" , "./cards/back_of_card.png")
    blank.setAttribute("class", "cardBlank");
    blank.setAttribute("id", "new");
    dealerTable.appendChild(card);
    dealerTable.appendChild(blank);
    cardDeck.splice(random, 1)

}


// First round only - player Hand

function HandStartPlayer(){
    let random = Math.floor((Math.random() * cardDeck.length - 1) + 1);
    let card = document.createElement("img");
    console.log(cardDeck[random]);
    console.log(random);
    card.setAttribute("src", "./cards/" + cardDeck[random].toString() + ".png")
    card.setAttribute("class", "cardPlayer");
    playerTable.appendChild(card);
    cardDeck.splice(random, 1)
    HitBtn.style.visibility = "visible";
    StandBtn.style.visibility = "visible";
}



// Couting values of cards 

function CountPoints(){
    const PlayerCard = document.querySelectorAll(".cardPlayer");
    const PlayerPoints = document.querySelector(".playerPoints");
    const DealerCard = document.querySelectorAll(".cardDealer");
    const DealerPoints = document.querySelector(".dealerPoints")



    // Player points
    
    let playerPoints = 0;
    for(let i = 0; i<PlayerCard.length; i++){
       let cardName =  PlayerCard[i].getAttribute("src");
       let splitSrc = cardName.split("/");
       let getValue = splitSrc[2].split("_");
       getValue = getValue[0];
       if(getValue == "2"){
            playerPoints +=2;
       } else if(getValue == "3"){
           playerPoints +=3;
       } else if(getValue == "4"){
           playerPoints +=4;
       } else if(getValue == "5"){
           playerPoints +=5;
       } else if(getValue == "6"){
           playerPoints +=6;
       } else if(getValue == "7"){
           playerPoints +=7;
       } else if(getValue == "8"){
           playerPoints +=8;
       } else if(getValue == "9"){
           playerPoints +=9;
       } else if(getValue == "10"){
           playerPoints +=10;
       } else if(getValue == "jack"){
           playerPoints +=10;
       } else if(getValue == "king"){
           playerPoints += 10;
       } else if(getValue == "queen"){
           playerPoints += 10;
       } else if(getValue == "ace"){
            playerPoints += 11;
            PlayerCard[i].setAttribute("value", "ace");
            }
       }
    
       // Check for Ace and adjust value 

    for(let i = 0; i<PlayerCard.length; i++){
        if(PlayerCard[i].getAttribute("value")){
            if(playerPoints - 11 < 11){
                playerPoints = playerPoints - 11;
                PlayerCard[i].setAttribute("value", "11");
                playerPoints += parseInt(PlayerCard[i].getAttribute("value"));
            } else {
                playerPoints = playerPoints - 11;
                PlayerCard[i].setAttribute("value", "1");
                playerPoints += parseInt(PlayerCard[i].getAttribute("value"));
            }
        }
    }

    pPoints = playerPoints;

    // possible sceniaros after counting player points

    if(playerPoints > 21){
    PlayerPoints.innerHTML = "You lose: " + playerPoints ;
    ResetBtn.disabled = false;
    HitBtn.disabled = true;
    StandBtn.disabled = true;
    } else if (playerPoints < 21){
        PlayerPoints.innerHTML = "Player Hand: " + playerPoints;
    } else {
        endGame.innerHTML = "You win, blackjack";
        CheckBetWin();
        HitBtn.disabled = true;
        StandBtn.disabled = true;
        ResetBtn.disabled = false;
        DoubleBtn.disabled = true;
    }





    // Dealer Points - are counting only, when Stand is pressed (That means you wont be playing more, and stay with your current points)

    if(StandStatus == false){
        console.log("Wait");
    } else {
        let dealerPoints = 0;
        for(let i = 0; i<DealerCard.length; i++){
       let cardNameD =  DealerCard[i].getAttribute("src");
       let splitSrcD = cardNameD.split("/");
       let getValueD = splitSrcD[2].split("_");
       getValueD = getValueD[0];
       if(getValueD == "2"){
            dealerPoints +=2;
       } else if(getValueD == "3"){
            dealerPoints +=3;
       } else if(getValueD == "4"){
            dealerPoints +=4;
       } else if(getValueD == "5"){
            dealerPoints +=5;
       } else if(getValueD == "6"){
            dealerPoints +=6;
       } else if(getValueD == "7"){
            dealerPoints +=7;
       } else if(getValueD == "8"){
            dealerPoints +=8;
       } else if(getValueD == "9"){
            dealerPoints +=9;
       } else if(getValueD == "10"){
            dealerPoints +=10;
       } else if(getValueD == "jack"){
            dealerPoints +=10;
       } else if(getValueD == "king"){
            dealerPoints += 10;
       } else if(getValueD == "queen"){
            dealerPoints += 10;
       } else if(getValueD == "ace"){
        if(dealerPoints + 11 > 21){
            DealerCard[i].setAttribute("value", "ace");
            dealerPoints +=1;
        } else {
            dealerPoints +=11;
        }
 
       }
    }

      // Check for Ace and adjust value 

    for(let i = 0; i<DealerCard.length; i++){
        if(DealerCard[i].getAttribute("value")){
            if(dealerPoints - 11 < 11){
                dealerPoints = dealerPoints - 11;
                DealerCard[i].setAttribute("value", "11");
                dealerPoints += parseInt(DealerCard[i].getAttribute("value"));
            } else {
                dealerPoints = dealerPoints - 11;
                DealerCard[i].setAttribute("value", "1");
                dealerPoints += parseInt(DealerCard[i].getAttribute("value"));
            }
        }
    }

    DealerPoints.innerHTML = "Dealer Hand: " + dealerPoints;  

    // Dealer will be assorting cards, when his points < player points

    Stand(dealerPoints, playerPoints);
    }
}


// Hit button - add player cards

HitBtn.addEventListener("click", Hit);
function Hit(){
    let random = Math.floor((Math.random() * cardDeck.length - 1) + 1);
    let card = document.createElement("img");
    card.setAttribute("src", "./cards/" + cardDeck[random].toString() + ".png")
    card.setAttribute("class", "cardPlayer");
    playerTable.appendChild(card);
    cardDeck.splice(random, 1)
    CountPoints()
}

// Change the second card of dealer hand (which we dont know what is under it) and trigger check points

function ChangeBlankCard(){
    let random = Math.floor((Math.random() * cardDeck.length - 1) + 1);
    let blank = document.querySelector(".cardBlank")
    blank.setAttribute("src", "./cards/" + cardDeck[random].toString() + ".png")
    blank.setAttribute("class", "cardDealer");
    StandStatus = true;
    CountPoints()
}

// Stand button - end "player round" and starts dealer one

StandBtn.addEventListener("click", ()=>{
    ChangeBlankCard()   
});

// Reset game to play again

ResetBtn.addEventListener("click",()=>{
    window.location.href = window.location.href
})

// Checking dealer and player points value, and trigger right response to it.

function Stand(dealerPoints, playerPoints){
    StandStatus = true;

    if(dealerPoints <= playerPoints){
    let random = Math.floor((Math.random() * cardDeck.length - 1) + 1);
    let card = document.createElement("img");
    card.setAttribute("src", "./cards/" + cardDeck[random].toString() + ".png")
    card.setAttribute("class", "cardDealer");
    dealerTable.appendChild(card);
    cardDeck.splice(random, 1)
    CountPoints();
} else if (dealerPoints == 21) {
    HitBtn.setAttribute("disabled", true);
    StandBtn.setAttribute("disabled",true);
    DoubleBtn.disabled = true;
    ResetBtn.disabled = false;
    endGame.innerHTML = "Dealer blackjack, you lose";
} else if (dealerPoints > 21){
    HitBtn.setAttribute("disabled", true);
    StandBtn.setAttribute("disabled",true);
    DoubleBtn.disabled = true;
    ResetBtn.disabled = false;
    endGame.innerHTML = "You win";
} else if(dealerPoints > playerPoints){
    endGame.innerHTML = "You lose";
    ResetBtn.disabled = false;
    DoubleBtn.disabled = true;
    HitBtn.setAttribute("disabled", true);
    StandBtn.setAttribute("disabled",true);

} 
    CheckBetWin();
}


// Manipulates our tokens, when some condition is right, also work with DoubleDown option (You get only 1 card, but you double your current bet)

function CheckBetWin(doubleDown){
    if(BetStatus == false){
        if(endGame.innerHTML == ""){
            console.log("empty");
        } else if(endGame.innerHTML == "You win"){
            
            if(doubleDown == true){
                const currentBet = parseInt(BetInput.value) * 2;
                const newTokens = parseInt(localStorage.getItem("tokens"));
                const sum = newTokens + (currentBet * 2);
                console.log(sum);
                localStorage.setItem("tokens", parseInt(sum));
            } else {

            const currentBet = parseInt(BetInput.value);
            const newTokens = parseInt(localStorage.getItem("tokens"));
            const sum = newTokens + (currentBet * 2);;
            localStorage.setItem("tokens", parseInt(sum));
        }
        
        } else if(endGame.innerHTML == "You win, blackjack"){
            console.log("blackjack");
            if(doubleDown == true){
                const currentBet = parseInt(BetInput.value);
                const newTokens = parseInt(localStorage.getItem("tokens"));
                const sum = newTokens + (currentBet * 2);
                localStorage.setItem("tokens", parseInt(sum));
            } else {
            
                const currentBet = parseInt(BetInput.value);
                const newTokens = parseInt(localStorage.getItem("tokens"));
                const sum = newTokens + (currentBet * 3);
                console.log(sum);
                localStorage.setItem("tokens", parseInt(sum));
            }
        }
            BetStatus = true;
        } else {
            const currentTokens = parseInt(localStorage.getItem("tokens"));
            localStorage.setItem("tokens", parseInt(currentTokens));
        }

}

