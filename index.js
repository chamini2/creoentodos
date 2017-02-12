function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

function wordsearchHTML() {
  const rows = _.times(11, (i) => {
    const rowCols = _.times(11,
      (j) => `<td class="w-${i}_${j}">_</td>`
    );
    return `<tr>${rowCols.join('\n\t')}\n</tr>`;
  });

  return `<table class="matrix"><tbody>
    ${rows.join('\n')}
  </tbody></table>`;
}

function hangmanHTML() {
  const rows = [
    _.times(11,
      (i) => `<td id="H-${i}">_</td>`
    ).join('\n\t')
  ]

  return `<table id="hangman-row"><tbody>
    ${rows.join('\n')}
  </tbody></table>`;
}

$(document).ready(function() {
  // const matrix = initialMatrix();
  // showCounters();
  // showMatrix(matrix);
  // changePosition('any');
  // setTimeout(() => workIt(matrix), 1000);

  _.forEach(['any', 'wrap', 'continued'], (type) => {
    const name = `wordsearch-${type}`;
    id$(name).html(wordsearchHTML(type));
    wordsearch(type, name);
  });
  id$('hangman').html(hangmanHTML());
});
