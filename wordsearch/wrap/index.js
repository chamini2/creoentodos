$(document).ready(function() {
  const type = 'wrap';
  const name = `wordsearch-${type}`;
  id$(name).html(wordsearchHTML(type));
  wordsearch(type, name);
});
