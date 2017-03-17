function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

$(document).ready(function() {
  _.forEach(['any', 'wrap', 'continued'], (type) => {
    const name = `wordsearch-${type}`;
    id$(name).html(wordsearchHTML(type));
    wordsearch(type, name);
  });
  id$('hangman').html(hangmanHTML());
  id$('concurrent').html(concurrentHTML());
  id$('list').html(listHTML());
  id$('swap').html(swap.HTML());
});
