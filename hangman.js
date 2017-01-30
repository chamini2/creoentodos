const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Hid$(id) {
  return id$(`H-${id}`);
}
function clearRow() {
  _.times(SIZE, (i) => {
    Hid$(i).text('_');
  });
}

function setUnderline(ind) {
  clss$('choosing').removeClass('choosing');
  Hid$(ind).addClass('choosing');
}

function cycleLetter(ind) {
  if (ind == 11) {
    // restart the whole thing
    setTimeout(function() {
      clearRow();
      cycleLetter(0)
    }, 500);
  } else {
    setUnderline(ind);
    setTimeout(function() {
      const toFind = CREOENTODOS[ind];
      const letter = _.sample(LETTERS);
      const nextInd = toFind == letter ? ind + 1 : ind;

      Hid$(ind).text(letter);

      cycleLetter(nextInd);
    }, 100);
  }
}

$(document).ready(function() {
  clearRow();
  cycleLetter(0);
});
