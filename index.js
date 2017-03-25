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
  id$('hangman').html(hangman.HTML());
  id$('concurrent').html(concurrent.HTML());
  id$('list').html(list.HTML());
  id$('swap').html(swap.HTML());
});
