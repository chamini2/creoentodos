const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const concurrent = {
  HTML() {
    const rows = [
      _.times(SIZE,
        (i) => `<td id="C-${i}">${CREOENTODOS[i]}</td>`
      ).join('\n\t')
    ]

    return `<table id="concurrent-row"><tbody>
    ${rows.join('\n')}
    </tbody></table>`;
  },
  start() {
    _.times(SIZE, CCycleLetter);
  },
  running : _.times(SIZE, _.constant(false))
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
  console.log("concurrent", ind);
  const toFind = CREOENTODOS[ind];
  const letter = _.sample(LETTERS);
  let time = 150;

  CUnmarkFound(ind);
  Cid$(ind).text(letter);

  if (toFind == letter) {
    CMarkFound(ind);
    time = 2000;
  }

  if (concurrent.continue) {
    setTimeout(function() {
      CCycleLetter(ind);
    }, time);
  }
}

swpr.on('slideChangeStart', function (a) {
  if (a.realIndex == INDEX_CONCURRENT) {
    concurrent.continue = true;
    concurrent.start();
  } else {
    concurrent.continue = false;
  }
});
