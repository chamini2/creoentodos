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
      letterTD.html(letter);
    });
  });
}

function markFound(found, cb, descr) {
  const time = 1000;

  function indexClass(index) {
    return `.path_${index}`
  }

  function go(descr) {
    setTimeout(function() {
      if (! _.some(descr, ({rest}) => _.size(rest))) {
        // No more letters to mark

        let completed = false;
        _.forEach(descr, ({index, past}) => {
          if (_.size(past) === size) {
            completed = true;
            // mark all completed ones
            $(indexClass(index)).removeClass().addClass('completed');
          } else {
            $(indexClass(index)).removeClass().addClass('abandoned');
          }
        });

        tried += 1;
        if (completed) {
          accomplished += 1;
        }
        return setTimeout(cb, time);
      }

      function markOrAbandon({toMark, toAbandon}, {index, rest}) {
        if (_.isEmpty(rest)) {
          toAbandon.push(index);
        } else {
          const clss = _.drop(indexClass(index), 1).join(''); // drop the dot (.)
          index$(..._.head(rest)).addClass(clss);
          toMark.push(index);
        }

        return {toMark, toAbandon};
      }
      const {toMark, toAbandon} = _.reduce(descr, markOrAbandon, {toMark: [], toAbandon: []});

      _.forEach(toAbandon, (index) => {
        $(indexClass(index)).removeClass('marked').addClass('abandoned');
      });

      _.forEach(toMark, (index) => {
        $(indexClass(index)).addClass('marked');
      });

      return go(_.map(descr, ({index, rest, past}) => {
        if (_.isEmpty(rest)) {
          return {index, rest, past};
        } else {
          const [head, ...restTail] = rest;
          return {index, rest: restTail, past: _.concat(past, [head])};
        }
      }));
    }, time);
  }

  return go(_.map(found, (rest, index) => ({ index, rest, past: [] })));
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
      const poss = _.filter(
        _.compact(
          _.map(dirs, (dir) => {
            const newP = _.zipWith(lastP, dir, (l,m) => l+m);
            return _.isEqual(penultimateP, newP) ? null : newP;
          })
        ),
        ([r,c]) => _.get(matrix, `[${r}][${c}]`) === letter
      );

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

  const all = _.orderBy(_.reduce(restL, go, paths), _.size, 'desc');
  return all;
  return _.take(all, 3);
}

function shuffledShownMatrix(matrix, times, cb) {
  const time = 100;

  matrix = shuffleAll(matrix);
  showMatrix(matrix);
  if (times <= 1) {
    cb(matrix);
  } else {
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
    shuffledShownMatrix(initialMatrix(), 0, function(matrix) {
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
