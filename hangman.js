const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Hid$(id) {
  return id$(`H-${id}`);
}

function clearRow() {
  _.times(SIZE, (i) => {
    Hid$(i).text(' ');
  });
}

function markChoosing(ind) {
  clss$('choosing').removeClass('choosing');
  Hid$(ind).addClass('choosing');
}

function cycleLetter(ind) {
  markChoosing(ind);

  setTimeout(function() {
    const toFind = CREOENTODOS[ind];
    const letter = _.sample(LETTERS);

    Hid$(ind).text(letter);

    if (toFind == letter) {
      // next letter
      if (ind + 1 === SIZE) {
        // finished finding the word!
        setTimeout(function() {
          clearRow();
          cycleLetter(0);
        }, 1000);
      } else {
        // keep finding the word
        setTimeout(function() {
          cycleLetter(ind + 1);
        }, 300);
      }
    } else {
      // same position
      cycleLetter(ind);
    }
  }, 75);
}

$(document).ready(function() {
  clearRow();
  cycleLetter(0);
});
