const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function clearRow() {
  _.times(SIZE, (i) => {
    id$(`H-${i}`).text(' ');
  });
}

function cycleLetter(ind) {
  if (ind == 0) {
    clearRow();
  }

  setTimeout(function() {
    const toFind = CREOENTODOS[ind];
    const letter = _.sample(LETTERS);
    const nextInd = (toFind == letter ? ind + 1 : ind) % SIZE;

    id$(`H-${ind}`).text(letter);

    cycleLetter(nextInd);
  }, 100);
}

$(document).ready(function() {
  cycleLetter(0);
});
