const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function hangmanHTML() {
  const rows = [
    _.times(SIZE,
      (i) => `<td id="H-${i}"> </td>`
    ).join('\n\t')
  ]

  return `<table id="hangman-row"><tbody>
    ${rows.join('\n')}
  </tbody></table>`;
}

function Hid$(id) {
  return id$(`H-${id}`);
}

function HClearRow() {
  _.times(SIZE, (i) => {
    Hid$(i).text(' ');
  });
}

function HMarkChoosing(ind) {
  clss$('choosing').removeClass('choosing');
  Hid$(ind).addClass('choosing');
}

function HCycleLetter(ind) {
  HMarkChoosing(ind);

  const toFind = CREOENTODOS[ind];
  const letter = _.sample(LETTERS);

  Hid$(ind).text(letter);

  if (toFind == letter) {
    // next letter
    if (ind + 1 === SIZE) {
      // finished finding the word!
      setTimeout(function() {
        HClearRow();
        HCycleLetter(0);
      }, 1000);
    } else {
      // keep finding the word
      setTimeout(function() {
        HCycleLetter(ind + 1);
      }, 300);
    }
  } else {
    // same position
    setTimeout(function() {
      HCycleLetter(ind);
    }, 75);
  }
}

$(document).ready(function() {
  HClearRow();
  HCycleLetter(0);
});
