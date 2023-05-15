/*L’utente clicca su un bottone che genererà una griglia, 
Ogni cella ha un numero progressivo, da 1 a 100.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.*/

//richiama elementi html
const container = document.getElementById("container");
const difficulty = document.getElementById("difficulty");
const score = document.getElementById("score");
const playButton = document.getElementById("play");

const bombsNumber = 16;

//genera griglia al click del pulsante play
playButton.addEventListener("click", play);

//FUNZIONI

//numero random min max
function randomNumMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//crea array di tot(es.16) numeri scegliendoli randomicamente da un totale di tot(es.100) numeri senza ripeterli
function arrRandomNumMinMax(howMany, numMin, numMax) {
  const array = [];

  while (array.length < howMany) {
    const numero = randomNumMinMax(numMin, numMax);

    if (!array.includes(numero)) {
      array.push(numero);
    }
  }

  return array;
}

//crea nuovo livello
function newLevel(totalCells, difficulty, verticalCellDistance) {
  //istruzioni new game
  console.clear();
  let punteggio = 0;

  score.innerHTML = "SCORE: 00";

  playButton.value = "New Game";

  container.innerHTML = "";

  //crea array che contiene tutte le celle della griglia
  const gridCells = document.getElementsByClassName("cell");
  console.log(gridCells);

  //crea array bombe
  const bombe = arrRandomNumMinMax(16, 0, totalCells);
  console.log(bombe);

  //crea layover
  const layover = document.createElement("div");
  layover.classList.add("layover");
  container.append(layover);

  //genera elementi (div) nella griglia
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", difficulty);
    container.append(cell);

    //flag per indicare se la cella è stata cliccata
    let isClicked = false;

    //al click aggiungi classe che colora la cella di rosso se il n° di essa appartiene all'array bombe, se no di azzuro
    cell.addEventListener(
      "click",

      function () {
        // se la cella è già stata cliccata, non fare nulla
        if (isClicked) {
          cell.classList.add("unclicked");
          return;
        } else {
          isClicked = true; // setta il flag per indicare che la cella è stata cliccata
        }

        //se la cella diventa rossa è gameover, scopri tutte le celle, dai un alert e un layover per rendere le celle non cliccabili
        if (bombe.includes(i)) {
          //rende attivo il layover
          layover.classList.add("active");

          //scopri tutte le celle
          for (let i = 0; i < gridCells.length; i++) {
            // se la cella corrente è una bomba, colora di rosso
            if (bombe.includes(i)) {
              gridCells[i].classList.add("bomb");
            } else if (
              //se la cella è adiacente alla bomba (destra sinistra sopra e sotto) colorala di arancione
              bombe.includes(i - 1) ||
              bombe.includes(i + 1) ||
              bombe.includes(i - verticalCellDistance) ||
              bombe.includes(i + verticalCellDistance)
            ) {
              gridCells[i].classList.add("close");
            } else {
              //se no colorala di azzurro
              gridCells[i].classList.add("clicked");
            }
          }

          //informa l'utente che ha perso
          setTimeout(() => {
            score.innerHTML = `GAME OVER<br>SCORE: 0${punteggio}`;
          }, 500);
        } else {
          //se la cella è adiacente alla bomba (destra sinistra sopra e sotto) colorala di arancione e il punteggio viene incrementato
          if (
            bombe.includes(i - 1) ||
            bombe.includes(i + 1) ||
            bombe.includes(i - verticalCellDistance) ||
            bombe.includes(i + verticalCellDistance)
          ) {
            cell.classList.add("close");
          }
          //se no la cella diventa azzurra e il punteggio viene incrementato
          cell.classList.add("clicked");
          punteggio++;
          score.innerHTML = `SCORE: 0${punteggio}`;

          //se clicchi tutte le celle senza bombe hai vinto, scopri tutte le bombe
          if (punteggio === totalCells - bombsNumber) {
            for (let i = 0; i < totalCells; i++) {
              if (bombe.includes(i)) {
                gridCells[i].classList.add("bomb");
              }
            }

            //attiva layover
            layover.classList.add("active");

            //informa l'utente che ha vinto
            setTimeout(() => {
              score.innerHTML = `YOU WIN<br>SCORE: 0${punteggio}`;
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
    newLevel(100, "easy", 10);
  } else if (difficulty.value === "medium") {
    newLevel(81, "medium", 9);
  } else {
    newLevel(49, "hard", 7);
  }
}
