/*L’utente clicca su un bottone che genererà una griglia, 
Ogni cella ha un numero progressivo, da 1 a 100.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.*/

//richiama elementi html
const container = document.getElementById("container");
const difficulty = document.getElementById("difficulty");
const score = document.getElementById("score");
const playButton = document.getElementById("play");

//genera griglia al click del pulsante play
playButton.addEventListener("click", play);


//FUNZIONI

//numero random min max
function randomNumMinMax (min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

//crea array di tot(es.16) numeri scegliendoli randomicamente da un totale di tot(es.100) numeri senza ripeterli
function arrRandomNumMinMax (howMany, numMin, numMax) {
    const array = [];

    while(array.length < howMany) {
        const numero = randomNumMinMax(numMin, numMax);
        
        if (!array.includes(numero)) {
            array.push(numero);
        }
    }
    
    return array;
    
}

//crea nuovo livello
function newLevel (elements, difficulty) {

    //istruzioni new game
    const punteggio = 0;

    score.innerHTML = "SCORE: 00";

    playButton.value = "New Game";

    container.innerHTML = "";

    //crea array che contiene tutte le box della griglia
    const gridBoxes = document.getElementsByClassName("box");

    //crea array bombe
    const bombe = arrRandomNumMinMax (16, 1, elements);

    //crea layover
    const layover = document.createElement("div");
    layover.classList.add("layover");
    container.append(layover);

    for (let i = 0; i < elements; i++) { //genera elementi (div) nella griglia

        const box = document.createElement("div");
        box.classList.add("box", difficulty);
        container.append(box);
        
        //flag per indicare se la cella è stata cliccata
        let isClicked = false;

        //al click aggiungi classe che colora la cella di rosso se il n° di essa appartiene all'array bombe, se no di azzuro
        box.addEventListener("click",

            function(){

                if (bombe.includes(i)) { //se la cella diventa rossa è gameover, scopri tutte le celle, dai un alert e un layover per rendere le celle non cliccabili

                    //rende attivo il layover
                    layover.classList.add("active");

                    for (let i = 0; i < elements; i++) { //scopri tutte le celle

                        if (bombe.includes(i)) {
                            gridBoxes[i].classList.add("bomb")
                        } else {
                            gridBoxes[i].classList.add("clicked")
                        }
                        
                    }

                    //informa l'utente che ha perso
                    setTimeout(() => {
                        score.innerHTML = `GAME OVER   SCORE: 0${punteggio}`;
                        alert(
                        `GAME OVER   SCORE: 0${punteggio}`
                        );

                    }, 500);

                } else { //se no la cella diventa azzurra e il punteggio viene incrementato   

                    box.classList.add("clicked");

                    if (isClicked) { // se la cella è già stata cliccata, non fare nulla
                        box.classList.add("unclicked");
                        return;
                    }
                    isClicked = true; // setta il flag per indicare che la cella è stata cliccata

                    punteggio++;
                    score.innerHTML = `SCORE: 0${punteggio}`;
                    
                    if (punteggio === elements - 16) { //se clicchi tutte le celle senza bombe hai vinto, scopri tutte le bombe
                        for (let i = 0; i < elements; i++) {
                            if (bombe.includes(i)) {
                                gridBoxes[i].classList.add("bomb")
                            } 
                        }

                        //attiva layover
                        layover.classList.add("active");

                        //informa l'utente che ha vinto
                        setTimeout(() => {
                            score.innerHTML = `YOU WIN   SCORE: 0${punteggio}`;
                            alert(
                            `YOU WIN   SCORE: 0${punteggio}`
                            );

                        }, 500);
                    }
                }    
            }
        );
    }
}

function play() {

    //cambia le celle generate in base alla difficoltà
    if (difficulty.value === "easy") {
        newLevel(100, "easy");
    } else if (difficulty.value === "medium") {
        newLevel(81, "medium");
    } else {
        newLevel(49, "hard");
    }

}
