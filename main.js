/*L’utente clicca su un bottone che genererà una griglia, 
Ogni cella ha un numero progressivo, da 1 a 100.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.*/

//richiama elementi html
const contenitore = document.getElementById("container");
const myButton = document.getElementById("button");
const difficolta = document.getElementById("difficulty");



//genera griglia
myButton.addEventListener("click",

    function(){
        //svuota griglia precedente
        contenitore.innerHTML = "";
        console.clear();

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

                            //se la cella diventa rossa è gameover, scopri tutte le celle
                            for (let i = 0; i < gridBoxes.length; i++) {
        
                                if (bombe.includes(i + 1)) {
                                    gridBoxes[i].classList.add("red")
                                } else {
                                    gridBoxes[i].classList.add("azure")
                                }
                                
                            }
                            
                        } else {
                            div.classList.add("azure");
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
                        if (bombe.includes(i)) {

                            //se la cella diventa rossa è gameover, scopri tutte le celle
                            for (let i = 0; i < gridBoxes.length; i++) {
        
                                if (bombe.includes(i + 1)) {
                                    gridBoxes[i].classList.add("red")
                                } else {
                                    gridBoxes[i].classList.add("azure")
                                }
                                
                            }
                            
                        } else {
                            div.classList.add("azure");
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

                            //se la cella diventa rossa è gameover, scopri tutte le celle
                            for (let i = 0; i < gridBoxes.length; i++) {
            
                                if (bombe.includes(i + 1)) {
                                    gridBoxes[i].classList.add("red");
                                } else {
                                    gridBoxes[i].classList.add("azure");
                                }
                                
                            }

                        } else {
                            div.classList.add("azure");
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