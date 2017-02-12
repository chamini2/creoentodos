function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

function wordsearchHTML() {
  const rows = _.times(11, (i) => {
    const rowCols = _.times(11,
      (j) => `<td id="${i}_${j}">_</td>`
    );
    return `<tr>${rowCols.join('\n\t')}\n</tr>`;
  });

  return `<table id="matrix"><tbody>
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

id$('wordsearch').html(wordsearchHTML());
id$('hangman').html(hangmanHTML());
