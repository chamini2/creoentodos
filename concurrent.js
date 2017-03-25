const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const concurrent = {
  timeoutID : [],
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
  cycle(ind) {
    if (concurrent.continue) {
      console.log("concurrent", ind);

      const toFind = CREOENTODOS[ind];
      const letter = _.sample(LETTERS);
      const found = toFind == letter;
      const time = found ? 2000 : 150;

      CUnmarkFound(ind);
      Cid$(ind).text(letter);

      if (found) {
        CMarkFound(ind);
      }

      concurrent.timeoutID[ind] = setTimeout(concurrent.cycle, time, ind);
    }
  },
  start() {
    concurrent.continue = true;
    _.times(SIZE, concurrent.cycle);
  },
  stop() {
    concurrent.continue = false;
    _.map(concurrent.timeoutID, clearTimeout);
  }
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

swpr.on('slideChangeStart', function (a) {
  if (a.realIndex == INDEX_CONCURRENT) {
    concurrent.start();
  } else {
    concurrent.stop();
  }
});
