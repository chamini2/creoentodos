$(document).ready(function() {
  const type = 'any';
  const name = `wordsearch-${type}`;
  id$(name).html(wordsearchHTML(type));
  wordsearch(type, name);
});
