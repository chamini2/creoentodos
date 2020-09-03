// navigator.serviceWorker.register('../service-worker.js');

const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const hangman = {
  continue : false,
  index : 0,
  HTML() {
    const rows = [
      _.times(SIZE,
        (i) => `<td id="H-${i}"> </td>`
      ).join('\n\t')
    ]

    return `<table id="hangman-row"><tbody>
      ${rows.join('\n')}
    </tbody></table>`;
  },
  cycle() {
    if (hangman.continue) {
      // console.log("hangman");

      if (hangman.index == 0) {
        HClearRow();
      }
      HMarkChoosing(hangman.index);

      const toFind = CREOENTODOS[hangman.index];
      const letter = _.sample(LETTERS);
      let time = 75;

      Hid$(hangman.index).text(letter);

      if (toFind == letter) {
        // found letter
        hangman.index = (hangman.index + 1) % SIZE;

        if (hangman.index == 0) {
          // finished finding the word
          time = 2000;
        } else {
          // next letter, same word
          time = 500;
        }
      }

      hangman.timeoutID = setTimeout(hangman.cycle, time);
    }
  },
  start() {
    hangman.continue = true;
    hangman.cycle();
  },
  stop() {
    hangman.continue = false;
    clearTimeout(hangman.timeoutID);
  }
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

function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

$(document).ready(function() {
  id$('hangman').html(hangman.HTML());
  hangman.start();
});
