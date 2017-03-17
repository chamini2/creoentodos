const CREOENTODOS = "CREOENTODOS";
const SIZE = _.size(CREOENTODOS);
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const swap = {
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
  cycle(state) {
    const one = _.random(SIZE-1), two = _.random(SIZE-1);
    const oneR = swap.id$(one), twoR = swap.id$(two);
    const oneL = oneR.text(), twoL = twoR.text();

    swap.unmarkFound(one);
    swap.unmarkFound(two);

    // swap letters
    oneR.text(twoL);
    twoR.text(oneL);
    if (twoL == CREOENTODOS[one]) {
      // the new one letter should be marked
      swap.markFound(one);
    }
    if (oneL == CREOENTODOS[two]) {
      // the new two letter should be marked
      swap.markFound(two);
    }
    setTimeout(function() {
      swap.cycle();
    }, 750);
  }
}

$(document).ready(function() {
  swap.cycle();
});
