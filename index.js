const CREOENTODOS = "CREOENTODOS";
const size = _.size(CREOENTODOS);
const dirs = {
  'left'       : [ 0,-1],
  'right'      : [ 0, 1],
  'up'         : [-1, 0],
  'dow'        : [ 1, 0],
  'up-left'    : [-1,-1],
  'up-right'   : [-1, 1],
  'down-left'  : [ 1,-1],
  'down-right' : [ 1, 1]
};
const foundColor = 'green';
const completeColor = 'gold';
const normalColor = 'white';

let accomplished = 0;
let tried = 0;

function initialMatrix() {
  let matrix = [];
  _.times(size, () => {
    matrix.push(_.toArray(CREOENTODOS));
  });

  return matrix;
}

function indexId(r, c) {
  return '#' + _.padStart(r, 2, '0') + '_' + _.padStart(c, 2, '0');
}

function showCounters(accomplished, tried) {
  $('#tried').text(tried);
  $('#accomplished').text(accomplished);
}

function showMatrix(matrix) {
  _.forEach(matrix, (word, r) => {
    _.forEach(word, (letter, c) => {
      var letterTD = $(indexId(r, c));
      letterTD.html(letter);
    });
  });
}

function markFound(matrix, found, cb, index) {
  const time = 01000;

  if (index === undefined) {
    markFound(matrix, found, cb, 0);
  } else if (_.some(_.map(found, `[${index}]`))) {
    setTimeout(function() {
      _.forEach(found, (path) => {
        const pos = _.get(path, `[${index}]`);
        if (pos) {
          const index = indexId(...pos);
          $(indexId(...pos)).css({ color: foundColor });
        }
      });
      markFound(matrix, found, cb, index + 1);
    }, time);
  } else {
    tried += 1;
    if (index == size) {
      console.log(_.map(matrix, (row) => row.join(' ')).join('\n'));
      // found some words! (at least one)
      accomplished += 1;
    }
    showCounters(accomplished, tried);
    setTimeout(cb, time);
  }
}

function clearFound(matrix, found, cb) {
  _.forEach(found, (path) => {
    _.forEach(path, (pos) => {
      $(indexId(...pos)).css({ color: normalColor });
    });
  });
}

// Shuffle all letters
function shuffle(matrix) {
  let letters = [];
  _.forEach(matrix, (word) => {
    letters = _.concat(letters, word);
  });

  letters = _.shuffle(letters);

  _.times(size, (i) => {
    matrix[i] = _.take(letters, size);
    letters = _.drop(letters, size);
  });

  return matrix;
}

// Shuffle per line
function shuffle$(matrix) {
  _.times(size, (i) => {
    matrix[i] = _.shuffle(matrix[i]);
  });

  return matrix;
}

function find(matrix) {
  let paths = [];

  let [startL, ...restL] = CREOENTODOS;

  _.forEach(matrix, (word, r) => {
    _.forEach(word, (letter, c) => {
      if (startL == letter) {
        paths.push([ [r,c] ]);
      }
    });
  });

  let size = 0;
  function go(paths, letter) {
    size = size + 1;
    console.log(letter);
    function go(path, index) {
      console.log(path);
      if (_.size(path) < size) {
        console.log('size');
        return [ path ];
      }

      const lastP = _.nth(path, -1);
      const penultimateP = _.nth(path, -2);

      // Valid positions only
      const poss = _.filter(
        _.compact(
          _.map(dirs, (dir) => {
            const newP = _.zipWith(lastP, dir, (l,m) => l+m);
            return _.isEqual(penultimateP, newP) ? null : newP;
          })
        ),
        ([r,c]) => _.get(matrix, '[' + r + '][' + c + ']') == letter
      );

      console.log('pss:', poss);
      if (_.isEmpty(poss)) {
        // No new letter found
        return [ path ];
      } else {
        // Some new letters found (1 or more)
        return _.map(poss, (pos) => _.concat(path, [pos]));
      }
    }

    return _.flatMap(paths, go);
  }

  const all = _.reduce(restL, go, paths);
  return all;
  return _.take(_.sortBy(all, (x) => - _.size(x)), 2);
}

function shuffledShownMatrix(matrix, times, cb) {
  const time = 0200;

  shuffle(matrix);
  showMatrix(matrix);
  if (times <= 1) {
    cb(matrix);
  } else {
    setTimeout(function () {
      shuffledShownMatrix(matrix, times-1, cb);
    }, time);
  }
}

function workIt() {
  const time = 02000;

  setTimeout(function() {
    shuffledShownMatrix(initialMatrix(), 3, function(matrix) {
      const found = find(matrix);
      markFound(matrix, found, function() {
        clearFound(matrix, found);
        workIt();
      });
    });
  }, time);
}

$(document).ready(function() {
  const matrix = initialMatrix();
  showCounters(accomplished, tried);
  showMatrix(matrix);
  workIt();
});
