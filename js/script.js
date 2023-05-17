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

//crea un elemento HTML e gli da delle classi
function createElementClass(element, ...classNames) {
  if (!classNames.length) {
    console.error("At least one class is required");
    return null;
  }

  const createdElement = document.createElement(element);
  createdElement.classList.add(...classNames);

  return createdElement;
}

//informa l'utente del gameover, scrivendo un messaggio e il punteggio in un elemento HTML
function gameover(message, score, element) {
  setTimeout(() => {
    element.innerHTML = message + "<br>SCORE: 0" + score;
  }, 500);
}

// Funzione per verificare se una cella è adiacente a una bomba
function isCellCloseToBomb(index, gridSize, bombsArray) {
  const left = index - 1;
  const right = index + 1;
  const up = index - gridSize;
  const down = index + gridSize;

  if (
    (index % gridSize !== 0 && bombsArray.includes(left)) ||
    (index % gridSize !== gridSize - 1 && bombsArray.includes(right)) ||
    bombsArray.includes(up) ||
    bombsArray.includes(down)
  ) {
    return true;
  }

  return false;
}
