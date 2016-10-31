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
  return $('#' + _.padStart(r, 2, '0') + '_' + _.padStart(c, 2, '0'));
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
  const time = 1000;

  function indexClass(index) {
    return `path_${index}`
  }
  function clss$(clss) {
    return $('.'+clss);
  }

  let times = 0;
  function go(descr) {
    times += 1;
    setTimeout(function() {
      clss$('marked').removeClass('marked');

      const newDescr = _(descr).filter('rest[0]')
      .map(({index, rest: [[r,c], ...rest]}) => {
        const clss = indexClass(index);
        index$(r, c).addClass(clss + ' passed');
        clss$(clss).addClass('marked');
        return {index, rest};
      })
      .value();

      if (_.isEmpty(newDescr)) {
        // No more letters to mark

        tried += 1;
        if (times === size) {
          accomplished += 1;
          _.forEach(descr, ({index}) => {
            // mark all completed ones
            $(indexClass(index)).removeClass().addClass('completed');
          });
        }

        return setTimeout(cb, time);
      } else {
        return go(newDescr);
      }
    }, time);
  }

  return go(_.map(found, (rest, index) => ({index, rest})));
}

function clearFound(matrix, found, cb) {
  _.forEach(found, (path) => {
    _.forEach(path, ([r, c]) => {
      index$(r, c).removeClass();
    });
  });
}

// Shuffle all letters
function shuffleAll(matrix) {
  return _.chunk(_.shuffle(_.flatten(matrix)), size);
}

// Shuffle per line
function shuffleLines(matrix) {
  return _.map(matrix, _.flowRight(_.shuffle, _.cloneDeep));
}

function find(matrix) {
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

      const lastP = _.nth(path, -1);
      const penultimateP = _.nth(path, -2);

      // Valid positions only
      const poss = _(dirs).map((dir) => {
        const newP = _.zipWith(lastP, dir, (l,m) => l+m);
        return _.isEqual(penultimateP, newP) ? null : newP;
      })
      .compact()
      .filter(([r,c]) => _.get(matrix, `[${r}][${c}]`) === letter)
      .value();

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
  const time = 300;

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

function workIt() {
  const time = 2000;

  setTimeout(function() {
    shuffledShownMatrix(initialMatrix(), 3, function(matrix) {
      const found = find(matrix);
      markFound(found, function(letters) {
        showCounters();
        clearFound(matrix, found);
        workIt();
      });
    });
  }, time);
}

$(document).ready(function() {
  const matrix = initialMatrix();
  showCounters();
  showMatrix(matrix);
  workIt();
});
