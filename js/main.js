/*L’utente clicca su un bottone che genererà una griglia, 
Ogni cella ha un numero progressivo, da 1 a 100.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.*/

//richiama elementi html
const container = document.getElementById("container");
const difficulty = document.getElementById("difficulty");
const displayScore = document.getElementById("score");
const playButton = document.getElementById("play");

const bombsNumber = 16;

//genera griglia al click del pulsante play
playButton.addEventListener("click", play);

//crea nuovo livello
function newLevel(gridSize, difficulty) {
  //istruzioni new game
  const totalCells = gridSize * gridSize;

  let score = 0;

  displayScore.innerHTML = "SCORE: 00";

  playButton.value = "New Game";

  container.innerHTML = "";

  //crea array che contiene tutte le celle della griglia
  const gridCells = document.getElementsByClassName("cell");

  //crea array bombe
  const bombsArray = arrRandomNumMinMax(16, 0, totalCells - 1);

  //crea layover
  const layover = createElementClass("div", "layover");
  container.append(layover);

  //genera elementi (div) nella griglia
  for (let i = 0; i < totalCells; i++) {
    const cell = createElementClass("div", "cell", difficulty);
    container.append(cell);

    //flag per indicare se la cella è stata cliccata
    let isClicked = false;

    //al click aggiungi classe che colora la cella di rosso se il n° di essa appartiene all'array bombe, se no di azzuro
    cell.addEventListener(
      "click",

      function () {
        // se la cella è già stata cliccata, non fare nulla
        if (isClicked) {
          cell.classList.add("unclickable");
          return;
        } else {
          isClicked = true; // setta il flag per indicare che la cella è stata cliccata
        }

        //se la cella diventa rossa è gameover, scopri tutte le celle, dai un alert e un layover per rendere le celle non cliccabili
        if (bombsArray.includes(i)) {
          //rende attivo il layover
          layover.classList.add("active");

          for (let i = 0; i < gridCells.length; i++) {
            // se la cella corrente è una bomba, colora di rosso
            if (bombsArray.includes(i)) {
              gridCells[i].classList.add("bomb");
              //se la cella è adiacente alla bomba (destra sinistra sopra e sotto) colorala di arancione
            } else if (isCellCloseToBomb(i, gridSize, bombsArray)) {
              gridCells[i].classList.add("orange");
              //se no colorala di azzurro
            } else {
              gridCells[i].classList.add("azure");
            }
          }

          //informa l'utente che ha perso
          gameover("GAME OVER", score, displayScore);
        } else {
          //se la cella è adiacente alla bomba (destra sinistra sopra e sotto) colorala di arancione e il punteggio viene incrementato
          if (isCellCloseToBomb(i, gridSize, bombsArray)) {
            cell.classList.add("orange");
          }
          //se no la cella diventa azzurra e il punteggio viene incrementato
          cell.classList.add("azure");
          score++;
          displayScore.innerHTML = `SCORE: 0${score}`;

          //se clicchi tutte le celle senza bombe hai vinto, scopri tutte le bombe
          if (score === totalCells - bombsNumber) {
            for (let i = 0; i < totalCells; i++) {
              if (bombsArray.includes(i)) {
                gridCells[i].classList.add("bomb");
              }
            }

            //attiva layover
            layover.classList.add("active");

            //informa l'utente che ha vinto
            gameover("YOU WIN", score, displayScore);
          }
        }
      }
    );
  }
}

function play() {
  //cambia le celle generate in base alla difficoltà
  if (difficulty.value === "easy") {
    newLevel(10, "easy");
  } else if (difficulty.value === "medium") {
    newLevel(9, "medium");
  } else {
    newLevel(7, "hard");
  }
}
