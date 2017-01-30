const CREOENTODOS = "CREOENTODOS";
const size = _.size(CREOENTODOS);
const dirs = {
  'left'       : [ 0,-1],
  'right'      : [ 0, 1],
  'up'         : [-1, 0],
  'down'       : [ 1, 0],
  'up-left'    : [-1,-1],
  'up-right'   : [-1, 1],
  'down-left'  : [ 1,-1],
  'down-right' : [ 1, 1]
};

let accomplished = 0;
let tried = 0;

function initialMatrix() {
  let matrix = [];
  _.times(size, () => {
    matrix.push(_.toArray(CREOENTODOS));
  });

  return matrix;
}

function index$(r, c) {
  return $(`#${_.padStart(r, 2, '0')}_${_.padStart(c, 2, '0')}`);
}

function showCounters() {
  $('#tried').text(tried);
  $('#accomplished').text(accomplished);
}

function showMatrix(matrix) {
  _.forEach(matrix, (word, r) => {
    _.forEach(word, (letter, c) => {
      const letterTD = index$(r, c);
      letterTD.text(letter);
    });
  });
}

function markFound(found, cb, descr) {
  const time = 800;

  function indexClass(index) {
    return `path_${index}`
  }

  let times = 0;
  function go(descr) {
    setTimeout(function() {
      clss$('marked').removeClass('marked just-marked');

      const newDescr = _(descr).filter('rest[0]')
      .map(({index, rest: [[r,c], ...rest]}) => {
        const clss = indexClass(index);
        index$(r, c).addClass(`${clss} just-marked`);
        clss$(clss).addClass('marked');
        return {index, rest};
      })
      .value();

      if (_.isEmpty(newDescr)) {
        // No more letters to mark

        tried += 1;
        if (times === size) {
          // Marked the word!
          accomplished += 1;
          $('#matrix td').addClass('non-completed');
          _.forEach(descr, ({index}) => {
            // mark all completed ones
            clss$(indexClass(index)).removeClass('non-completed').addClass('completed');
          });
          return setTimeout(cb, 3000); // Show it longer
        } else {
          return cb();
        }

      } else {
        times += 1;
        return go(newDescr);
      }
    }, time);
  }

  return go(_.map(found, (rest, index) => ({index, rest})));
}

function clearMatrix() {
  _.times(size, (r) => {
    _.times(size, (c) => {
      index$(r, c).removeClass();
    });
  })
}

// Shuffle all letters
function shuffleAll(matrix) {
  return _.chunk(_.shuffle(_.flatten(matrix)), size);
}

// Shuffle per line
function shuffleLines(matrix) {
  return _.map(matrix, _.flowRight(_.shuffle, _.cloneDeep));
}

function findPosAnyDir(matrix, path, letter) {
  const lastP = _.nth(path, -1);
  const penultimateP = _.nth(path, -2);

  return _(dirs).map((dir) => {
    const newP = _.zipWith(lastP, dir, (l,m) => l+m);
    return _.isEqual(penultimateP, newP) ? null : newP;
  })
  .compact()
  .filter(([r,c]) => _.get(matrix, `[${r}][${c}]`) === letter)
  .value();
}

function findPosAnyDirWrap(matrix, path, letter) {
  const lastP = _.nth(path, -1);
  const penultimateP = _.nth(path, -2);

  return _(dirs).map((dir) => {
    // col + col, row + row; wrapping around
    const newP = _.zipWith(lastP, dir, (l,m) => (l+m) % size);
    return _.isEqual(penultimateP, newP) ? null : newP;
  })
  .compact()
  .filter(([r,c]) => _.get(matrix, `[${r}][${c}]`) === letter)
  .value();
}

function findContinuedDir(matrix, path, letter) {
  if (_.size(path) == 1) {
    return findPosAnyDir(matrix, path, letter);
  } else {
    const lastP = _.nth(path, -1);
    const penultimateP = _.nth(path, -2);

    const [r, c] = _.zipWith(lastP, penultimateP, (l,p) => l + (l-p));
    if (_.get(matrix, `[${r}][${c}]`) === letter) {
      return [[r], [c]];
    } else {
      return [];
    }
  }
}

function find(matrix, positions) {
  let paths = [];

  const startL = _.head(CREOENTODOS);
  const restL = _.tail(CREOENTODOS);

  _.forEach(matrix, (word, r) => {
    _.forEach(word, (letter, c) => {
      if (startL === letter) {
        paths.push([ [r,c] ]);
      }
    });
  });

  let size = 0;
  function go(paths, letter) {
    size = size + 1;

    function go(path, index) {
      if (_.size(path) < size) {
        return [ path ];
      }

      // Valid positions only
      const poss = positions(matrix, path, letter);

      if (_.isEmpty(poss)) {
        // No new letter found
        return [ path ];
      } else {
        // Some new letters found (1 or more)
        return _(poss).map((pos) => _.concat(path, [ pos ])).value();
      }
    }

    return _.flatMap(paths, go);
  }

  return _.reduce(restL, go, paths);
}

function shuffledShownMatrix(matrix, times, cb) {
  const time = 140;

  showMatrix(matrix);
  if (times < 1) {
    cb(matrix);
  } else {
    matrix = shuffleAll(matrix);
    setTimeout(function () {
      shuffledShownMatrix(matrix, times-1, cb);
    }, time);
  }
}

function logMatrix(matrix) {
  console.log(_.map(matrix, (row) => row.join(' ')).join('\n'));
}

function workIt(matrix) {
  clearMatrix();
  shuffledShownMatrix(matrix, 5, function(matrix) {
    const found = find(matrix, positions);
    markFound(found, function(letters) {
      showCounters();
      workIt(matrix);
    });
  });
}

// The positions function to use in the find function
let positions;

// To change the positions function to use
function changePosition(name) {
  switch (name) {
    case 'wrap':
      positions = findPosAnyDirWrap;
      break;
    case 'continued':
      positions = findContinuedDir;
      break;
    case 'any':
    default:
      positions = findPosAnyDir;
      break;
  }
}

$(document).ready(function() {
  const matrix = initialMatrix();
  showCounters();
  showMatrix(matrix);
  changePosition('any');
  setTimeout(() => workIt(matrix), 1000);
});
