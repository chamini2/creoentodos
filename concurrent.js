const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function concurrentHTML() {
  const rows = [
    _.times(SIZE,
      (i) => `<td id="C-${i}">${CREOENTODOS[i]}</td>`
    ).join('\n\t')
  ]

  return `<table id="concurrent-row"><tbody>
    ${rows.join('\n')}
  </tbody></table>`;
}

function Cid$(id) {
  return id$(`C-${id}`);
}

function CMarkFound(ind) {
  Cid$(ind).addClass('C-found');
}
function CUnmarkFound(ind) {
  Cid$(ind).removeClass('C-found');
}

function CCycleLetter(ind) {
  const toFind = CREOENTODOS[ind];
  const letter = _.sample(LETTERS);

  CUnmarkFound(ind);
  Cid$(ind).text(letter);

  if (toFind == letter) {
    CMarkFound(ind);
    // found it
    setTimeout(function() {
      CCycleLetter(ind);
    }, 2000);
  } else {
    // same position
    setTimeout(function() {
      CCycleLetter(ind);
    }, 75);
  }
}

$(document).ready(function() {
  setTimeout(function() {
    _.times(SIZE, CCycleLetter);
  }, 3000);
});
