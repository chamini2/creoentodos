// navigator.serviceWorker.register('../service-worker.js');

const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const swap = {
  continue : false,
  indices : _.times(11),
  HTML() {
    const rows = [
      _.times(SIZE,
        (i) => `<td id="${swap.iden(i)}" class="S-found">${CREOENTODOS[i]}</td>`
      ).join('\n\t')
    ]

    return `<table id="swap-row"><tbody>
      ${rows.join('\n')}
    </tbody></table>`;
  },
  iden(id) {
    return `S-${id}`;
  },
  id$(id) {
    // bad, bad, bad
    return window.id$(swap.iden(id));
  },
  markFound(ind) {
    swap.id$(ind).addClass('S-found');
  },
  unmarkFound(ind) {
    swap.id$(ind).removeClass('S-found');
  },
  checkMarking(ind, letter) {
    if (letter == CREOENTODOS[ind]) {
      // the new `ind` letter should be marked
      swap.markFound(ind);
      // remove it from indices
      _.pull(swap.indices, ind);
      setTimeout(function() {
        // re-add it after some time
        swap.indices.push(ind);
      }, 2000);
    }
  },
  cycle(state) {
    if (swap.continue) {
      // console.log("swap");
      const one = _.sample(swap.indices);
      const oneR = swap.id$(one);
      const oneL = oneR.text();

      const two = _.sample(swap.indices);
      const twoR = swap.id$(two);
      const twoL = twoR.text();

      if (one != two) {
        // unmark them for now
        swap.unmarkFound(one);
        swap.unmarkFound(two);

        // swap letters
        oneR.text(twoL);
        twoR.text(oneL);

        // and check makings
        swap.checkMarking(one, twoL);
        swap.checkMarking(two, oneL);
      }

      swap.timeoutID = setTimeout(swap.cycle, 200);
    }
  },
  start() {
    swap.continue = true;
    swap.cycle();
  },
  stop() {
    swap.continue = false;
    clearTimeout(swap.timeoutID);
  }
}

function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

$(document).ready(function() {
  id$('swap').html(swap.HTML());
  swap.start();
});
