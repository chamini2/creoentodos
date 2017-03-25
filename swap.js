const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const swap = {
  continue : false,
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
  indices : _.times(11),
  checkMarking(ind, letter) {
    if (letter == CREOENTODOS[ind]) {
      // the new `ind` letter should be marked
      swap.markFound(ind);
      // remove it from indices
      _.pull(swap.indices, ind);
      setTimeout(function() {
        // re-add it after some time
        swap.indices.push(ind);
      }, 1500);
    }
  },
  cycle(state) {
    console.log("swap");
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

    if (swap.continue) {
      setTimeout(function() { swap.cycle(); }, 125);
    }
  }
}

swpr.on('slideChangeStart', function (a) {
  if (a.realIndex == INDEX_SWAP) {
    swap.continue = true;
    swap.cycle();
  } else {
    swap.continue = false;
  }
});
