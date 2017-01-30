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
  if (ind == 0) {
    clearRow();
  }

  setUnderline(ind);

  setTimeout(function() {
    const toFind = CREOENTODOS[ind];
    const letter = _.sample(LETTERS);

    Hid$(ind).text(letter);

    if (toFind == letter) {
      // next letter
      setTimeout(function() {
        cycleLetter((ind + 1) % SIZE);
      }, 300);
    } else {
      // same position
      cycleLetter(ind);
    }
  }, 100);
}

$(document).ready(function() {
  clearRow();
  cycleLetter(0);
});
