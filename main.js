/*L’utente clicca su un bottone che genererà una griglia, 
Ogni cella ha un numero progressivo, da 1 a 100.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.*/

//richiama elementi html
const contenitore = document.getElementById("container");
const difficolta = document.getElementById("difficulty");
const score = document.getElementById("score");

//genera griglia
const playButton = document.getElementById("play").addEventListener("click",

    function(){
        //istruzioni new game
        let punteggio = 0;
        score.innerHTML = "SCORE: 00";

        this.value = "New Game";

        contenitore.innerHTML = "";
        console.clear();

        //crea layover
        const layoverDiv = document.createElement("div");
        layoverDiv.classList.add("layover");
        contenitore.append(layoverDiv);

        //crea array che contiene tutte le box della griglia
        const gridBoxes = document.getElementsByClassName("box");
        console.log(gridBoxes);

        //DIFFICOLTA' EASY
        if (difficolta.value === "easy") {
            
            //crea array bombe
            const bombe = arrRandomNumMinMax (16, 1, 100);
            console.log(bombe);

            //genera 100 elementi (div) nella griglia
            for (let i = 1; i <= 100; i++) {

                const div = document.createElement("div");
                div.classList.add("box");
                div.classList.add("easy");
                contenitore.append(div);
                
                //al click aggiungi classe che colora la cella di rosso se il n° di essa appartiene all'array bombe, se no di azzuro
                div.addEventListener("click",

                    function(){

                        if (bombe.includes(i)) {
                            //se la cella diventa rossa è gameover, scopri tutte le celle, dai un alert e un layover per rendere le celle non cliccabili
                            layoverDiv.classList.add("active");
                            for (let i = 0; i < gridBoxes.length; i++) {
        
                                if (bombe.includes(i + 1)) {
                                    gridBoxes[i].classList.add("bomb")
                                } else {
                                    gridBoxes[i].classList.add("clicked")
                                }
                                
                            }

                            setTimeout(() => {
                                score.innerHTML = `GAME OVER   SCORE: 0${punteggio}`;
                                alert(
                                   `GAME OVER   SCORE: 0${punteggio}`
                                );

                            }, 500);
                            
                         //se no la cella diventa azzurra e il punteggio viene incrementato     
                        } else { 
                            div.classList.add("clicked");
                            punteggio++;
                            score.innerHTML = `SCORE: 0${punteggio}`;
                            
                            //se clicchi tutte le celle senza bombe hai vinto, scopri tutte le bombe
                            if (punteggio === 84) {
                                for (let i = 0; i < gridBoxes.length; i++) {
                                    if (bombe.includes(i + 1)) {
                                        gridBoxes[i].classList.add("bomb")
                                    } 
                                }
                        
                                layoverDiv.classList.add("active");
                                score.innerHTML = `SCORE: 0${punteggio}`;

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

        } else if (difficolta.value === "medium") { //DIFFICOLTA' MEDIUM

            //crea array bombe
            const bombe = arrRandomNumMinMax (16, 1, 81);
            console.log(bombe);
            
            //genera 81 elementi (div) nella griglia
            for (let i = 1; i <= 81; i++) {

                const div = document.createElement("div");
                div.classList.add("box");
                div.classList.add("medium");
                contenitore.append(div);

                //al click aggiungi classe che colora la cella di rosso se il n° di essa appartiene all'array bombe, se no di azzuro
                div.addEventListener("click",

                    function(){
                        //se la cella diventa rossa è gameover, scopri tutte le celle, dai un alert e un layover per rendere le celle non cliccabili
                        if (bombe.includes(i)) { 
                            
                            layoverDiv.classList.add("active");
                            for (let i = 0; i < gridBoxes.length; i++) {
        
                                if (bombe.includes(i + 1)) {
                                    gridBoxes[i].classList.add("bomb")
                                } else {
                                    gridBoxes[i].classList.add("clicked")
                                }
                                
                            }

                            setTimeout(() => {
                                score.innerHTML = `GAME OVER   SCORE: 0${punteggio}`;
                                alert(
                                   `GAME OVER   SCORE: 0${punteggio}`
                                );

                            }, 500);

                         //se no la cella diventa azzurra e il punteggio viene incrementato     
                        } else { 
                            div.classList.add("clicked");
                            punteggio++;
                            score.innerHTML = `SCORE: 0${punteggio}`;
                            
                            //se clicchi tutte le celle senza bombe hai vinto, scopri tutte le bombe
                            if (punteggio === 65) {
                                for (let i = 0; i < gridBoxes.length; i++) {
                                    if (bombe.includes(i + 1)) {
                                        gridBoxes[i].classList.add("bomb")
                                    } 
                                }
                        
                                layoverDiv.classList.add("active");
                                score.innerHTML = `SCORE: 0${punteggio}`;

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

        } else { //DIFFICOLTA' HARD

            //crea array bombe
            const bombe = arrRandomNumMinMax (16, 1, 49);
            console.log(bombe);
            
            //genera 49 elementi (div) nella griglia
            for (let i = 1; i <= 49; i++) {

                const div = document.createElement("div");
                div.classList.add("box");
                div.classList.add("hard");
                contenitore.append(div);

                //al click aggiungi classe che colora la cella di rosso se il n° di essa appartiene all'array bombe, se no di azzuro
                div.addEventListener("click",

                    function(){

                        if (bombe.includes(i)) {
                            //se la cella diventa rossa è gameover, scopri tutte le celle, dai un alert e un layover per rendere le celle non cliccabili
                            layoverDiv.classList.add("active");
                            for (let i = 0; i < gridBoxes.length; i++) {
        
                                if (bombe.includes(i + 1)) {
                                    gridBoxes[i].classList.add("bomb")
                                } else {
                                    gridBoxes[i].classList.add("clicked")
                                }
                                
                            }

                            setTimeout(() => {
                                score.innerHTML = `GAME OVER   SCORE: 0${punteggio}`;
                                alert(
                                   `GAME OVER   SCORE: 0${punteggio}`
                                );

                            }, 500);
                            
                         //se no la cella diventa azzurra e il punteggio viene incrementato     
                        } else { 
                            div.classList.add("clicked");
                            punteggio++;
                            score.innerHTML = `SCORE: 0${punteggio}`;
                            
                            //se clicchi tutte le celle senza bombe hai vinto, scopri tutte le bombe
                            if (punteggio === 34) {
                                for (let i = 0; i < gridBoxes.length; i++) {
                                    if (bombe.includes(i + 1)) {
                                        gridBoxes[i].classList.add("bomb")
                                    } 
                                }
                        
                                layoverDiv.classList.add("active");
                                score.innerHTML = `SCORE: 0${punteggio}`;

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
    }  
);



//FUNZIONI

//numero random min max
function randomNumMinMax (min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

//crea array di tot(es.16) numeri scegliendoli randomicamente da un totale di tot(es.100) numeri
function arrRandomNumMinMax (howMany, numMin, numMax) {
    const array = [];

    while(array.length < howMany) {
        let numero = randomNumMinMax(numMin, numMax);
        
        if (!array.includes(numero)) {
            array.push(numero);
        }
    }
    
    return array;
    
}